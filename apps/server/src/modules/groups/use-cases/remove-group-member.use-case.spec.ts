import { IdValueObject } from '@fair-pact/contracts/src/shared/value-objects/id.value-object'
import { beforeEach, describe, expect, it } from 'vitest'
import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { RemoveGroupMemberUseCase } from './remove-group-member.use-case'

describe('RemoveGroupMemberUseCase', () => {
  let removeGroupMemberUseCase: RemoveGroupMemberUseCase
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    removeGroupMemberUseCase = new RemoveGroupMemberUseCase(groupsRepository)
  })

  it('should remove a group member', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake({ members: [memberId] })
    await groupsRepository.create(group)
    await removeGroupMemberUseCase.execute({ id: group.id.value, userId: memberId.value })
    const result = await groupsRepository.findById(group.id.value)
    expect(result?.members.map(m => m.value)).not.toContain(memberId.value)
  })

  // biome-ignore lint/suspicious/noSkippedTests: method not implemented
  it.skip('should throw an error if invalid data is provided', async () => {
    await expect(removeGroupMemberUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group does not exist', async () => {
    const memberId = IdValueObject.create()
    await expect(
      removeGroupMemberUseCase.execute({ id: 'invalid-id', userId: memberId.value })
    ).rejects.toThrow('Group not found')
  })

  it('should throw an error if member does not exist', async () => {
    const memberId = IdValueObject.create()
    const group = groupFake()
    await groupsRepository.create(group)
    await expect(
      removeGroupMemberUseCase.execute({ id: group.id.value, userId: memberId.value })
    ).rejects.toThrow('Member not found')
  })
})
