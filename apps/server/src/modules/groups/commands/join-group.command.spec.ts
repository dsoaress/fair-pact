import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { ConflictException } from '@/core/exceptions/conflict.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { JoinGroupCommand } from './join-group.command'

describe('JoinGroupCommand', () => {
  let joinGroupCommand: JoinGroupCommand
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    joinGroupCommand = new JoinGroupCommand(groupsRepository)
  })

  it('should join a group', async () => {
    const newMemberId = IdValueObject.create().value
    const group = groupFake()
    await groupsRepository.create(group)
    await joinGroupCommand.execute({ id: group.id.value, memberId: newMemberId })
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).toContain(newMemberId)
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(joinGroupCommand.execute({} as never)).rejects.toBeInstanceOf(BadRequestException)
  })

  it('should throw an error if group does not exist', async () => {
    const newMemberId = IdValueObject.create().value
    await expect(
      joinGroupCommand.execute({ id: IdValueObject.create().value, memberId: newMemberId })
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw an error if user is already a member', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake({ members: [memberId] })
    await groupsRepository.create(group)
    await expect(
      joinGroupCommand.execute({ id: group.id.value, memberId: memberId.value })
    ).rejects.toBeInstanceOf(ConflictException)
  })
})
