import { eq } from 'drizzle-orm'

import type { CacheService } from '@/core/base/cache-service'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupTransactionParticipants, groupTransactions } from '@/infra/database/drizzle/schemas'
import type { GroupTransactionModel } from '@/modules/groups/models/group-transaction.model'
import type { GroupTransactionsRepository } from '@/modules/groups/repositories/group-transactions.repository'

type GroupTransactionResult = {
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
  groupId: string
  amount: number
  payerMemberId: string
  participants: {
    memberId: string
    amount: number
  }[]
  date: Date
}

export class DrizzleGroupTransactionsRepository implements GroupTransactionsRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly cacheService: CacheService
  ) {}

  async findById(id: string): Promise<GroupTransactionModel | null> {
    const result = await this.drizzleService.query.groupTransactions.findFirst({
      where: eq(groupTransactions.id, id),
      with: { participants: { columns: { memberId: true, amount: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupTransactionModel): Promise<void> {
    await Promise.all([
      this.cacheService.remove(`group-transactions:${model.groupId.value}`),
      this.drizzleService.transaction(async tx => {
        await tx.insert(groupTransactions).values({
          id: model.id.value,
          name: model.name,
          groupId: model.groupId.value,
          payerMemberId: model.payerMemberId.value,
          amount: model.amount,
          date: model.date,
          createdBy: model.createdBy.value,
          createdAt: model.createdAt
        })

        await tx.insert(groupTransactionParticipants).values(
          model.participants.map(participant => ({
            groupTransactionId: model.id.value,
            memberId: participant.memberId.value,
            amount: participant.amount,
            payerMemberId: model.payerMemberId.value,
            groupId: model.groupId.value
          }))
        )
      })
    ])
  }

  async update(model: GroupTransactionModel): Promise<void> {
    await Promise.all([
      this.cacheService.remove(`group-transactions:${model.groupId.value}`),
      this.cacheService.remove(`group-transaction:${model.id.value}`),
      this.drizzleService.transaction(async tx => {
        await tx
          .update(groupTransactions)
          .set({
            name: model.name,
            payerMemberId: model.payerMemberId.value,
            date: model.date,
            amount: model.amount,
            updatedAt: model.updatedAt,
            updatedBy: model.updatedBy?.value
          })
          .where(eq(groupTransactions.id, model.id.value))
        await Promise.all(
          model.participants.map(participant =>
            tx
              .insert(groupTransactionParticipants)
              .values({
                groupTransactionId: model.id.value,
                memberId: participant.memberId.value,
                amount: participant.amount,
                payerMemberId: model.payerMemberId.value,
                groupId: model.groupId.value
              })
              .onConflictDoUpdate({
                target: [
                  groupTransactionParticipants.groupTransactionId,
                  groupTransactionParticipants.memberId
                ],
                set: { amount: participant.amount, payerMemberId: model.payerMemberId.value }
              })
          )
        )
      })
    ])
  }

  async delete(id: string): Promise<void> {
    const groupId = await this.drizzleService.query.groupTransactions.findFirst({
      where: eq(groupTransactions.id, id),
      columns: { groupId: true }
    })
    await Promise.all([
      this.cacheService.remove(`group-transactions:${groupId}`),
      this.cacheService.remove(`group-transaction:${id}`),
      this.drizzleService.delete(groupTransactions).where(eq(groupTransactions.id, id))
    ])
  }

  private mapToModel(result: GroupTransactionResult): GroupTransactionModel {
    return {
      id: IdValueObject.create(result.id),
      name: result.name,
      groupId: IdValueObject.create(result.groupId),
      amount: result.amount,
      payerMemberId: IdValueObject.create(result.payerMemberId),
      participants: result.participants.map(participant => ({
        memberId: IdValueObject.create(participant.memberId),
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
