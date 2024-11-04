import { eq } from 'drizzle-orm'

import type { GroupTransactionModel } from '@/modules/groups/models/group-transaction.model'
import type { GroupTransactionsRepository } from '@/modules/groups/repositories/group-transactions.respository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { db } from '../../drizzle.service'
import { groupTransactionParticipants, groupTransactions } from '../../schemas'

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
  groupTransactionParticipants: {
    memberId: string
    amount: number
  }[]
}

export class DrizzleGroupTransactionsRepository implements GroupTransactionsRepository {
  async findById(id: string): Promise<GroupTransactionModel | null> {
    const result = await db.query.groupTransactions.findFirst({
      where: eq(groupTransactions.id, id),
      with: {
        groupTransactionParticipants: {
          columns: {
            memberId: true,
            amount: true
          }
        }
      }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupTransactionModel): Promise<void> {
    await db.insert(groupTransactions).values({
      id: model.id.value,
      name: model.name,
      groupId: model.groupId.value,
      payerMemberId: model.payerMemberId.value,
      amount: model.amount,
      createdBy: model.createdBy.value,
      createdAt: model.createdAt
    })
    await db.insert(groupTransactionParticipants).values(
      model.participants.map(participant => ({
        groupTransactionId: model.id.value,
        memberId: participant.memberId.value,
        amount: participant.amount
      }))
    )
  }

  async update(model: GroupTransactionModel): Promise<void> {
    await db
      .delete(groupTransactionParticipants)
      .where(eq(groupTransactionParticipants.groupTransactionId, model.id.value))
    await db
      .update(groupTransactions)
      .set({
        name: model.name,
        groupId: model.groupId.value,
        payerMemberId: model.payerMemberId.value,
        updatedAt: model.updatedAt,
        updatedBy: model.updatedBy?.value ?? null
      })
      .where(eq(groupTransactions.id, model.id.value))
    await db.insert(groupTransactionParticipants).values(
      model.participants.map(participant => ({
        groupTransactionId: model.id.value,
        memberId: participant.memberId.value,
        amount: participant.amount
      }))
    )
  }

  async delete(id: string): Promise<void> {
    await db
      .delete(groupTransactionParticipants)
      .where(eq(groupTransactionParticipants.groupTransactionId, id))
    await db.delete(groupTransactions).where(eq(groupTransactions.id, id))
  }

  private mapToModel(result: GroupTransactionResult): GroupTransactionModel {
    return {
      id: IdValueObject.create(result.id),
      name: result.name,
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined,
      updatedAt: result.updatedAt ?? undefined,
      groupId: IdValueObject.create(result.groupId),
      amount: result.amount,
      payerMemberId: IdValueObject.create(result.payerMemberId),
      participants: result.groupTransactionParticipants.map(participant => ({
        memberId: IdValueObject.create(participant.memberId),
        amount: participant.amount
      }))
    }
  }
}
