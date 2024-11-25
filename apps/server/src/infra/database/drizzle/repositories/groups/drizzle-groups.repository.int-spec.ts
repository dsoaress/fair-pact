import { drizzleService } from '@/infra/database/drizzle/drizzle.service'
import { users } from '@/infra/database/drizzle/schemas'

import type { CacheService } from '@/core/base/cache-service'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import { RedisCacheServiceAdapter } from '@/infra/adapters/cache-service/redis/redis-cache-service.adapter'
import { groupFake } from '@/modules/groups/utils/tests/fakes/group.fake'
import { DrizzleGroupsRepository } from './drizzle-groups.repository'

describe('GroupsRepository', () => {
  let cacheService: CacheService
  let groupsRepository: DrizzleGroupsRepository

  beforeAll(async () => {
    cacheService = new RedisCacheServiceAdapter()
    groupsRepository = new DrizzleGroupsRepository(drizzleService, cacheService)
  })

  it('should find a group by id', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    const result = await groupsRepository.findById(group.id.value)
    if (result) {
      result.id = result.id.value as unknown as IdValueObject
      result.createdBy = result.createdBy.value as unknown as IdValueObject
    }
    expect(result).toMatchObject({
      id: group.id,
      name: group.name,
      currency: group.currency,
      createdBy: group.createdBy,
      createdAt: group.createdAt,
      updatedBy: undefined,
      updatedAt: undefined
    })
  })

  it('should create a group with a member', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    const result = await groupsRepository.findById(group.id.value)
    expect(result).toBeDefined()
    expect(result?.members).toHaveLength(1)
    expect(result?.members[0].value).toBe(group.createdBy.value)
  })

  it('should to add group members', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    const newMemberId = IdValueObject.create().value
    await drizzleService.insert(users).values({
      id: newMemberId,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.addGroupMember(group.id.value, newMemberId)
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).toContain(newMemberId)
  })

  it('should to remove group members', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    const newMemberId = IdValueObject.create().value
    await drizzleService.insert(users).values({
      id: newMemberId,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.addGroupMember(group.id.value, newMemberId)
    await groupsRepository.removeGroupMember(group.id.value, newMemberId)
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).not.toContain(newMemberId)
  })

  it('should update a group', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    const updatedGroup = {
      ...group,
      name: 'Updated',
      currency: 'BRL',
      updatedBy: group.createdBy,
      updatedAt: new Date()
    }
    await groupsRepository.update(updatedGroup as never)
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.name).toBe(updatedGroup.name)
    expect(result?.currency).toBe(updatedGroup.currency)
    expect(result?.updatedAt).toBeDefined()
    expect(result?.updatedBy?.value).toBeDefined()
  })

  it('should delete a group', async () => {
    const group = groupFake()
    await drizzleService.insert(users).values({
      id: group.createdBy.value,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      createdAt: new Date()
    })
    await groupsRepository.create(group)
    await groupsRepository.delete(group.id.value)
    const result = await groupsRepository.findById(group.id.value)
    expect(result).toBeNull()
  })
})
