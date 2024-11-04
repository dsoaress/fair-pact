import { beforeEach, describe, expect, it } from 'vitest'

import { GroupsController } from '../controllers/groups.controller'
import type { GroupsRepository } from '../repositories/groups.repository'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { groupsFactory } from './groups.factory'

describe('groupsFactory', () => {
  let groupsRepository: GroupsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
  })

  it('should return a GroupsController instance', () => {
    const controller = groupsFactory(groupsRepository)
    expect(controller).toBeInstanceOf(GroupsController)
  })
})
