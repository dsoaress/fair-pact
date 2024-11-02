import { beforeEach, describe, expect, it } from 'vitest'

import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupMemberFake } from '../utils/tests/fakes/group-member.fake'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupMembersRepository } from '../utils/tests/in-memory-repositories/in-memory-group-members.repository'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { CreateGroupMemberUseCase } from './create-group-member.use-case'

describe('CreateGroupMemberUseCase', () => {
  let createGroupMemberUseCase: CreateGroupMemberUseCase
  let groupsRepository: GroupsRepository
  let groupMembersRepository: GroupMembersRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    groupMembersRepository = new InMemoryGroupMembersRepository()
    createGroupMemberUseCase = new CreateGroupMemberUseCase(
      groupsRepository,
      groupMembersRepository
    )
  })

  it('should create a group member', async () => {
    const fakeGroupData = groupFake()
    const fakeGroupMemberData = groupMemberFake({ groupId: fakeGroupData.id })
    await groupsRepository.create(fakeGroupData)
    const input = {
      groupId: fakeGroupMemberData.groupId.value,
      userId: fakeGroupMemberData.userId.value
    }
    await createGroupMemberUseCase.execute(input)
    const groupMember = await groupMembersRepository.findByGroupIdAndUserId(
      fakeGroupMemberData.groupId.value,
      fakeGroupMemberData.userId.value
    )
    expect(groupMember).toEqual({
      groupId: fakeGroupMemberData.groupId,
      userId: expect.any(Object),
      createdAt: expect.any(Date)
    })
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(createGroupMemberUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group does not exist', async () => {
    const fakeData = groupMemberFake()
    const input = {
      groupId: fakeData.groupId.value,
      userId: fakeData.userId.value
    }
    await expect(createGroupMemberUseCase.execute(input)).rejects.toThrow('Group not found')
  })
})
