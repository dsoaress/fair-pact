import { beforeEach, describe, expect, it } from 'vitest'

import { groupFake } from '@/shared/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '@/shared/tests/in-memory-repositories/in-memory-groups.repository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { GroupsRepository } from '../repositories/groups.repository'
import { UpdateGroupUseCase } from './update-group.use-case'

describe('UpdateGroupUseCase', () => {
  const id = IdValueObject.create()
  let updateGroupUseCase: UpdateGroupUseCase
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository([groupFake({ id })])
    updateGroupUseCase = new UpdateGroupUseCase(groupsRepository)
  })

  it('should update a group', async () => {
    const newMemberId = IdValueObject.create()
    const data = { name: 'New name', members: [newMemberId.value] }
    await updateGroupUseCase.execute({
      id: id.value,
      data,
      updatedBy: IdValueObject.create().value
    })
    const group = await groupsRepository.findById(id.value)
    expect(group?.name).toBe(data.name)
    expect(group?.members[0].value).toBe(newMemberId.value)
  })

  it('should do nothing if data is empty', async () => {
    await updateGroupUseCase.execute({
      id: id.value,
      data: {},
      updatedBy: IdValueObject.create().value
    })
    const group = await groupsRepository.findById(id.value)
    expect(group?.name).toBe('Group Name')
  })

  it('should throw if data is invalid', async () => {
    const data = { name: 'a' }

    await expect(
      updateGroupUseCase.execute({
        id: id.value,
        data,
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toThrow()
  })

  it('should throw if group does not exist', async () => {
    await expect(
      updateGroupUseCase.execute({
        id: IdValueObject.create().value,
        data: { name: 'New name' },
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toThrow()
  })
})
