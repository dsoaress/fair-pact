import { beforeEach, describe, expect, it } from 'vitest'

import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupMembersRepository } from '../utils/tests/in-memory-repositories/in-memory-group-members.repository'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { CreateGroupUseCase } from './create-group.use-case'

describe('CreateGroupUseCase', () => {
  let createGroupUseCase: CreateGroupUseCase
  let groupsRepository: GroupsRepository
  let groupMembersRepository: GroupMembersRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    groupMembersRepository = new InMemoryGroupMembersRepository()
    createGroupUseCase = new CreateGroupUseCase(groupsRepository, groupMembersRepository)
  })

  it('should create a group', async () => {
    const fakeData = groupFake()
    const input = {
      name: fakeData.name,
      currency: fakeData.currency,
      createdBy: fakeData.createdBy.value
    }
    await createGroupUseCase.execute(input)
    const result = await groupsRepository.findByNameAndCreatedBy(
      fakeData.name,
      fakeData.createdBy.value
    )
    expect(result).toBeDefined()
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(createGroupUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group already exists', async () => {
    const fakeData = groupFake()
    const input = {
      name: fakeData.name,
      currency: fakeData.currency,
      createdBy: fakeData.createdBy.value
    }
    await createGroupUseCase.execute(input)
    await expect(createGroupUseCase.execute(input)).rejects.toThrow()
  })
})