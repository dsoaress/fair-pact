import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'
import { beforeEach, describe, expect, it } from 'vitest'

import type { GroupsRepository } from '../repositories/groups.repository'
import { groupFake } from '../utils/tests/fakes/group.fake'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
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
    await deleteGroupUseCase.execute({ id: id.value })
    const deletedGroup = await groupsRepository.findById(id.value)
    expect(deletedGroup).toBeNull()
  })

  it('should throw an error if invalid data is provided', async () => {
    await expect(deleteGroupUseCase.execute({} as never)).rejects.toThrow()
  })

  it('should throw an error if group does not exist', async () => {
    await expect(deleteGroupUseCase.execute({ id: IdValueObject.create().value })).rejects.toThrow(
      'Group not found'
    )
  })
})
