import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { RemoveGroupMemberCommand } from './remove-group-member.command'

describe('RemoveGroupMemberCommand', () => {
  let removeGroupMemberCommand: RemoveGroupMemberCommand
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    removeGroupMemberCommand = new RemoveGroupMemberCommand(groupsRepository)
  })

  it('should remove a group member', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake({ members: [memberId] })
    await groupsRepository.create(group)
    await removeGroupMemberCommand.execute({ id: group.id.value, memberId: memberId.value })
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).not.toContain(memberId.value)
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(removeGroupMemberCommand.execute({} as never)).rejects.toBeInstanceOf(
      BadRequestException
    )
  })

  it('should throw an error if group does not exist', async () => {
    const memberId = IdValueObject.create()
    await expect(
      removeGroupMemberCommand.execute({
        id: IdValueObject.create().value,
        memberId: memberId.value
      })
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw an error if member does not exist', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake()
    await groupsRepository.create(group)
    await expect(
      removeGroupMemberCommand.execute({ id: group.id.value, memberId: memberId.value })
    ).rejects.toBeInstanceOf(NotFoundException)
  })
})
