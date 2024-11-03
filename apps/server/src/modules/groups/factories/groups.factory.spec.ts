import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGroupsRepository } from '@/shared/tests/in-memory-repositories/in-memory-groups.repository'

import { GroupsController } from '../controllers/groups.controller'
import type { GroupsRepository } from '../repositories/groups.repository'
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
