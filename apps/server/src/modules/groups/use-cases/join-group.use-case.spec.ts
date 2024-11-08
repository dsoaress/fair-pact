import { IdValueObject } from '@fair-pact/contracts/src/shared/value-objects/id.value-object'
import { beforeEach, describe, expect, it } from 'vitest'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { JoinGroupUseCase } from './join-group.use-case'

describe('JoinGroupUseCase', () => {
  let joinGroupUseCase: JoinGroupUseCase
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    joinGroupUseCase = new JoinGroupUseCase(groupsRepository)
  })

  it('should join a group', async () => {
    const newMemberId = IdValueObject.create().value
    const group = groupFake()
    await groupsRepository.create(group)
    await joinGroupUseCase.execute({ id: group.id.value, userId: newMemberId })
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).toContain(newMemberId)
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(joinGroupUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group does not exist', async () => {
    const newMemberId = IdValueObject.create().value
    await expect(
      joinGroupUseCase.execute({ id: IdValueObject.create().value, userId: newMemberId })
    ).rejects.toThrow('Group not found')
  })

  it('should throw an error if user is already a member', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake({ members: [memberId] })
    await groupsRepository.create(group)
    await expect(
      joinGroupUseCase.execute({ id: group.id.value, userId: memberId.value })
    ).rejects.toThrow('Member already exists')
  })
})
