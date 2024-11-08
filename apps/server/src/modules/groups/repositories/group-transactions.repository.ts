import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'
import { eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupTransactionParticipants, groupTransactions } from '@/infra/database/drizzle/schemas'
import type { Repository } from '@/shared/base/repository'

import type { GroupTransactionModel } from '../models/group-transaction.model'

type GroupTransactionResult = {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
  groupId: string
  amount: number
  payerUserId: string
  participants: {
    userId: string
    amount: number
  }[]
  date: Date
}

export class GroupTransactionsRepository implements Repository<GroupTransactionModel> {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string): Promise<GroupTransactionModel | null> {
    const result = await this.drizzleService.query.groupTransactions.findFirst({
      where: eq(groupTransactions.id, id),
      with: { participants: { columns: { userId: true, amount: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupTransactionModel): Promise<void> {
    await this.drizzleService.transaction(async tx => {
      await tx.insert(groupTransactions).values({
        id: model.id.value,
        name: model.name,
        groupId: model.groupId.value,
        payerUserId: model.payerUserId.value,
        amount: model.amount,
        date: model.date,
        createdBy: model.createdBy.value,
        createdAt: model.createdAt
      })

      await tx.insert(groupTransactionParticipants).values(
        model.participants.map(participant => ({
          groupTransactionId: model.id.value,
          userId: participant.userId.value,
          amount: participant.amount,
          payerUserId: model.payerUserId.value,
          groupId: model.groupId.value
        }))
      )
    })
  }

  async update(model: GroupTransactionModel): Promise<void> {
    await this.drizzleService
      .delete(groupTransactionParticipants)
      .where(eq(groupTransactionParticipants.groupTransactionId, model.id.value))
    await this.drizzleService
      .update(groupTransactions)
      .set({
        name: model.name,
        payerUserId: model.payerUserId.value,
        date: model.date,
        updatedAt: model.updatedAt,
        updatedBy: model.updatedBy?.value ?? null
      })
      .where(eq(groupTransactions.id, model.id.value))
    await this.drizzleService.insert(groupTransactionParticipants).values(
      model.participants.map(participant => ({
        groupTransactionId: model.id.value,
        userId: participant.userId.value,
        amount: participant.amount,
        payerUserId: model.payerUserId.value,
        groupId: model.groupId.value
      }))
    )
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService
      .delete(groupTransactionParticipants)
      .where(eq(groupTransactionParticipants.groupTransactionId, id))
    await this.drizzleService.delete(groupTransactions).where(eq(groupTransactions.id, id))
  }

  private mapToModel(result: GroupTransactionResult): GroupTransactionModel {
    return {
      id: IdValueObject.create(result.id),
      name: result.name,
      groupId: IdValueObject.create(result.groupId),
      amount: result.amount,
      payerUserId: IdValueObject.create(result.payerUserId),
      participants: result.participants.map(participant => ({
        userId: IdValueObject.create(participant.userId),
        amount: participant.amount
      })),
      date: result.date,
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined,
      updatedAt: result.updatedAt ?? undefined
    }
  }
}
