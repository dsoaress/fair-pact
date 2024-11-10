import { IdValueObject } from 'contracts'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { users } from '@/infra/database/drizzle/schemas'
import { createDatabaseContainer } from '@/shared/utils/tests/database-container'

import { groupFake } from '../utils/tests/fakes/group.fake'
import { GroupsRepository } from './groups.repository'

describe('GroupsRepository', () => {
  let groupsRepository: GroupsRepository
  let drizzleService: DrizzleService

  beforeAll(async () => {
    drizzleService = await createDatabaseContainer()
    groupsRepository = new GroupsRepository(drizzleService)
  })

  afterEach(async () => {
    await drizzleService.delete(users)
  })

  it('should find a group by id', async () => {
    const group = groupFake()
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
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
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
    await groupsRepository.create(group)
    const result = await groupsRepository.findById(group.id.value)
    expect(result).toBeDefined()
    expect(result?.members).toHaveLength(1)
    expect(result?.members[0].value).toBe(group.createdBy.value)
  })

  it('should to add group members', async () => {
    const group = groupFake()
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
    await groupsRepository.create(group)
    const newMemberId = IdValueObject.create().value
    await drizzleService
      .insert(users)
      .values({ id: newMemberId, firstName: 'Jane', lastName: 'Doe' })
    await groupsRepository.addGroupMember(group.id.value, newMemberId)
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).toContain(newMemberId)
  })

  it('should to remove group members', async () => {
    const group = groupFake()
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
    await groupsRepository.create(group)
    const newMemberId = IdValueObject.create().value
    await drizzleService
      .insert(users)
      .values({ id: newMemberId, firstName: 'Jane', lastName: 'Doe' })
    await groupsRepository.addGroupMember(group.id.value, newMemberId)
    await groupsRepository.removeGroupMember(group.id.value, newMemberId)
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).not.toContain(newMemberId)
  })

  it('should update a group', async () => {
    const group = groupFake()
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
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
    await drizzleService
      .insert(users)
      .values({ id: group.createdBy.value, firstName: 'John', lastName: 'Doe' })
    await groupsRepository.create(group)
    await groupsRepository.delete(group.id.value)
    const result = await groupsRepository.findById(group.id.value)
    expect(result).toBeNull()
  })
})
