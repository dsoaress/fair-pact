import { beforeEach, describe, expect, it } from 'vitest'

import { groupFake } from '@/shared/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '@/shared/tests/in-memory-repositories/in-memory-groups.repository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { GroupsRepository } from '../repositories/groups.repository'
import { DeleteGroupUseCase } from './delete-group.use-case'

describe('DeleteGroupUseCase', () => {
  const id = IdValueObject.create()
  const createdBy = IdValueObject.create()
  let deleteGroupUseCase: DeleteGroupUseCase
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository([groupFake({ id, createdBy })])
    deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository)
  })

  it('should delete a group', async () => {
    await deleteGroupUseCase.execute({ id: id.value, userId: createdBy.value })
    const deletedGroup = await groupsRepository.findById(id.value)
    expect(deletedGroup).toBeNull()
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(deleteGroupUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group does not exist', async () => {
    await expect(
      deleteGroupUseCase.execute({ id: 'invalid-id', userId: createdBy.value })
    ).rejects.toThrow('Group not found')
  })

  it('should throw an error if user is not the creator of the group', async () => {
    await expect(
      deleteGroupUseCase.execute({ id: id.value, userId: 'invalid-user-id' })
    ).rejects.toThrow('You are not allowed to delete this group')
  })
})
