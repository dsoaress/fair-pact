import { drizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers, groups, users } from '@/infra/database/drizzle/schemas'
import { groupTransactionFake } from '@/modules/groups/utils/tests/fakes/group-transaction.fake'

import type { CacheService } from '@/core/base/cache-service'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import { RedisCacheServiceAdapter } from '@/infra/adapters/cache-service/redis/redis-cache-service.adapter'
import { DrizzleGroupTransactionsRepository } from './drizzle-group-transactions.repository'

describe('DrizzleGroupTransactionsRepository', () => {
  const memberId = IdValueObject.create()
  const groupId = IdValueObject.create()
  let cacheService: CacheService
  let groupTransactionsRepository: DrizzleGroupTransactionsRepository

  beforeEach(async () => {
    cacheService = new RedisCacheServiceAdapter()
    groupTransactionsRepository = new DrizzleGroupTransactionsRepository(
      drizzleService,
      cacheService
    )

    await drizzleService.transaction(async tx => {
      await tx.insert(users).values({
        id: memberId.value,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        createdAt: new Date()
      })
      await tx.insert(groups).values({
        id: groupId.value,
        name: 'Group 1',
        currency: 'USD',
        createdBy: memberId.value,
        createdAt: new Date()
      })
    })
  })

  it('should find a group transaction by id', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      payerMemberId: memberId,
      createdBy: memberId,
      participants: [{ memberId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    if (result) {
      result.id = result.id.value as unknown as IdValueObject
      result.groupId = result.groupId.value as unknown as IdValueObject
      result.payerMemberId = result.payerMemberId.value as unknown as IdValueObject
      result.createdBy = result.createdBy.value as unknown as IdValueObject
      result.participants = result.participants.map(participant => ({
        memberId: participant.memberId.value as unknown as IdValueObject,
        amount: participant.amount
      }))
    }
    expect(result).toMatchObject({
      id: groupTransaction.id.value,
      groupId: groupTransaction.groupId.value,
      payerMemberId: groupTransaction.payerMemberId.value,
      createdBy: groupTransaction.createdBy.value,
      createdAt: groupTransaction.createdAt,
      updatedBy: undefined,
      updatedAt: undefined,
      participants: expect.arrayContaining([
        expect.objectContaining({
          memberId: groupTransaction.payerMemberId.value,
          amount: 100
        })
      ])
    })
  })

  it('should create a group transaction with participants', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      payerMemberId: memberId,
      createdBy: memberId,
      participants: [{ memberId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result).toBeDefined()
  })

  it('should update a group transaction', async () => {
    const groupTransaction = groupTransactionFake({
      groupId,
      amount: 50,
      payerMemberId: memberId,
      createdBy: memberId,
      participants: [{ memberId, amount: 50 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    const newMemberId = IdValueObject.create()
    await drizzleService.insert(users).values({
      id: newMemberId.value,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@test.com',
      createdAt: new Date()
    })
    await drizzleService
      .insert(groupMembers)
      .values({ memberId: newMemberId.value, groupId: groupId.value, createdAt: new Date() })
    const updatedGroupTransaction = {
      ...groupTransaction,
      name: 'Updated Group Transaction',
      payerMemberId: newMemberId,
      amount: 200,
      date: new Date(),
      updatedAt: new Date(),
      updatedBy: newMemberId,
      participants: [
        { memberId: memberId, amount: 100 },
        { memberId: newMemberId, amount: 100 }
      ]
    }
    await groupTransactionsRepository.update(updatedGroupTransaction)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result?.name).toBe(updatedGroupTransaction.name)
    expect(result?.payerMemberId.value).toBe(newMemberId.value)
    expect(String(result?.date)).toBe(String(updatedGroupTransaction.date))
    expect(result?.updatedAt).toBeDefined()
    expect(result?.updatedBy?.value).toBe(newMemberId.value)
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
      payerMemberId: memberId,
      createdBy: memberId,
      participants: [{ memberId, amount: 100 }]
    })
    await groupTransactionsRepository.create(groupTransaction)
    await groupTransactionsRepository.delete(groupTransaction.id.value)
    const result = await groupTransactionsRepository.findById(groupTransaction.id.value)
    expect(result).toBeNull()
  })
})
