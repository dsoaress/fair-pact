import { beforeEach, describe, expect, it } from 'vitest'

import { groupFake } from '@/shared/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '@/shared/tests/in-memory-repositories/in-memory-groups.repository'

import type { GroupsRepository } from '../repositories/groups.repository'
import { CreateGroupUseCase } from './create-group.use-case'

describe('CreateGroupUseCase', () => {
  let createGroupUseCase: CreateGroupUseCase
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    createGroupUseCase = new CreateGroupUseCase(groupsRepository)
  })

  it('should create a group', async () => {
    const fakeData = groupFake()
    const input = {
      name: fakeData.name,
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
      createdBy: fakeData.createdBy.value
    }
    await createGroupUseCase.execute(input)
    await expect(createGroupUseCase.execute(input)).rejects.toThrow()
  })
})
