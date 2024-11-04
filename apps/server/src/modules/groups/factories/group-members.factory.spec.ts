import { beforeEach, describe, expect, it } from 'vitest'

import { GroupMembersController } from '../controllers/group-members.controller'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { InMemoryGroupMembersRepository } from '../utils/tests/in-memory-repositories/in-memory-group-members.repository'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { groupMembersFactory } from './group-members.factory'

describe('groupMembersFactory', () => {
  let groupsRepository: GroupsRepository
  let groupMembersRepository: GroupMembersRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    groupMembersRepository = new InMemoryGroupMembersRepository()
  })

  it('should return a GroupsController instance', () => {
    const controller = groupMembersFactory(groupsRepository, groupMembersRepository)
    expect(controller).toBeInstanceOf(GroupMembersController)
  })
})
