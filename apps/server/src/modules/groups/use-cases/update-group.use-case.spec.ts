import { beforeEach, describe, expect, it } from 'vitest'

import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
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
    await updateGroupUseCase.execute({
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
    await updateGroupUseCase.execute({
      id: id.value,
      updatedBy: IdValueObject.create().value
    })
    const group = await groupsRepository.findById(id.value)
    expect(group?.name).toBe('Group Name')
  })

  it('should throw if data is invalid', async () => {
    await expect(
      updateGroupUseCase.execute({
        id: id.value,
        name: 'a',
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toThrow()
  })

  it('should throw if group does not exist', async () => {
    await expect(
      updateGroupUseCase.execute({
        id: IdValueObject.create().value,
        name: 'New name',
        updatedBy: IdValueObject.create().value
      })
    ).rejects.toThrow()
  })
})
