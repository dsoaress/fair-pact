import { IdValueObject } from 'contracts'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { drizzleService } from '@/shared/database/drizzle/drizzle.service'
import { groupMembers, groupTransactions, groups, users } from '@/shared/database/drizzle/schemas'
import { groupTransactionFake } from '../utils/tests/fakes/group-transaction.fake'
import { GroupTransactionsRepository } from './group-transactions.repository'

describe('GroupTransactionsRepository', () => {
  const userId = IdValueObject.create()
  const groupId = IdValueObject.create()
  let groupTransactionsRepository: GroupTransactionsRepository

  beforeAll(async () => {
    groupTransactionsRepository = new GroupTransactionsRepository(drizzleService)

    await drizzleService.transaction(async tx => {
      await tx.insert(users).values({ id: userId.value, firstName: 'John', lastName: 'Doe' })
      await tx.insert(groups).values({
        id: groupId.value,
        name: 'Group 1',
        currency: 'USD',
        createdBy: userId.value,
        createdAt: new Date()
      })
    })
  })

  beforeEach(async () => {
    await drizzleService.delete(groupTransactions)
  })

  it('should find a group transaction by id', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      payerUserId: userId,
      createdBy: userId,
      participants: [{ userId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    if (result) {
      result.id = result.id.value as unknown as IdValueObject
      result.groupId = result.groupId.value as unknown as IdValueObject
      result.payerUserId = result.payerUserId.value as unknown as IdValueObject
      result.createdBy = result.createdBy.value as unknown as IdValueObject
      result.participants = result.participants.map(participant => ({
        userId: participant.userId.value as unknown as IdValueObject,
        amount: participant.amount
      }))
    }
    expect(result).toMatchObject({
      id: groupTransaction.id.value,
      groupId: groupTransaction.groupId.value,
      payerUserId: groupTransaction.payerUserId.value,
      createdBy: groupTransaction.createdBy.value,
      createdAt: groupTransaction.createdAt,
      updatedBy: undefined,
      updatedAt: undefined,
      participants: expect.arrayContaining([
        expect.objectContaining({
          userId: groupTransaction.payerUserId.value,
          amount: 100
        })
      ])
    })
  })

  it('should create a group transaction with participants', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      payerUserId: userId,
      createdBy: userId,
      participants: [{ userId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result).toBeDefined()
  })

  it('should update a group transaction', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      amount: 50,
      payerUserId: userId,
      createdBy: userId,
      participants: [{ userId, amount: 50 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const newUserId = IdValueObject.create()
    await drizzleService
      .insert(users)
      .values({ id: newUserId.value, firstName: 'Jane', lastName: 'Doe' })
    await drizzleService
      .insert(groupMembers)
      .values({ userId: newUserId.value, groupId: groupId.value, createdAt: new Date() })
    const updatedGroupTransaction = {
      ...groupTransaction,
      name: 'Updated Group Transaction',
      payerUserId: newUserId,
      amount: 200,
      date: new Date(),
      updatedAt: new Date(),
      updatedBy: newUserId,
      participants: [
        { userId: userId, amount: 100 },
        { userId: newUserId, amount: 100 }
      ]
    }
    await groupTransactionsRepository.update(updatedGroupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result?.name).toBe(updatedGroupTransaction.name)
    expect(result?.payerUserId.value).toBe(newUserId.value)
    expect(String(result?.date)).toBe(String(updatedGroupTransaction.date))
    expect(result?.updatedAt).toBeDefined()
    expect(result?.updatedBy?.value).toBe(newUserId.value)
    expect(result?.amount).toBe(updatedGroupTransaction.amount)
    expect(result?.participants).toHaveLength(2)
    expect(result?.participants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ amount: 100 }),
        expect.objectContaining({ amount: 100 })
      ])
    )
  })

  it('should delete a group transaction', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      payerUserId: userId,
      createdBy: userId,
      participants: [{ userId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    await groupTransactionsRepository.delete(groupTransaction.id.value)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result).toBeNull()
  })
})
