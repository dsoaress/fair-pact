import { BadRequestException } from '@/core/exceptions/bad-request.exception'

import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { CreateGroupCommand } from './create-group.command'

describe('CreateGroupCommand', () => {
  let createGroupCommand: CreateGroupCommand
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    createGroupCommand = new CreateGroupCommand(groupsRepository)
  })

  it('should create a group', async () => {
    const fakeData = groupFake()
    const input = {
      name: fakeData.name,
      currency: fakeData.currency,
      createdBy: fakeData.createdBy.value
    }
    await createGroupCommand.execute(input)
    const result = await groupsRepository.findById(fakeData.id.value)
    expect(result).toBeDefined()
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(createGroupCommand.execute({} as never)).rejects.toBeInstanceOf(
      BadRequestException
    )
  })
})
