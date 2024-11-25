import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { UpdateGroupCommand } from './update-group.command'

describe('UpdateGroupCommand', () => {
  const id = IdValueObject.create()
  let updateGroupCommand: UpdateGroupCommand
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository([groupFake({ id })])
    updateGroupCommand = new UpdateGroupCommand(groupsRepository)
  })

  it('should update a group', async () => {
    await updateGroupCommand.execute({
      id: id.value,
      name: 'New name',
      currency: 'EUR',
      updatedBy: IdValueObject.create().value
    })
    const group = await groupsRepository.findById(id.value)
    expect(group?.name).toBe('New name')
    expect(group?.currency).toBe('EUR')
  })

  it('should do nothing if data is empty', async () => {
    await updateGroupCommand.execute({
      id: id.value,
      updatedBy: IdValueObject.create().value
    })
    const group = await groupsRepository.findById(id.value)
    expect(group?.name).toBe('Group Name')
  })

  it('should throw if data is invalid', async () => {
    await expect(
      updateGroupCommand.execute({
        id: id.value,
        name: 'a',
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toBeInstanceOf(BadRequestException)
  })

  it('should throw if group does not exist', async () => {
    await expect(
      updateGroupCommand.execute({
        id: IdValueObject.create().value,
        name: 'New name',
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
