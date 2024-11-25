import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { DeleteGroupCommand } from './delete-group.command'

describe('DeleteGroupCommand', () => {
  const id = IdValueObject.create()
  const createdBy = IdValueObject.create()
  let deleteGroupCommand: DeleteGroupCommand
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository([groupFake({ id, createdBy })])
    deleteGroupCommand = new DeleteGroupCommand(groupsRepository)
  })

  it('should delete a group', async () => {
    await deleteGroupCommand.execute({ id: id.value })
    const deletedGroup = await groupsRepository.findById(id.value)
    expect(deletedGroup).toBeNull()
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(deleteGroupCommand.execute({} as never)).rejects.toBeInstanceOf(
      BadRequestException
    )
  })

  it('should throw an error if group does not exist', async () => {
    await expect(
      deleteGroupCommand.execute({ id: IdValueObject.create().value })
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
