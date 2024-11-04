import { beforeEach, describe, expect, it } from 'vitest'

import { GroupTransactionsController } from '../controllers/group-transactions.controller'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { InMemoryGroupTransactionsRepository } from '../utils/tests/in-memory-repositories/in-memory-group-transactions.repository'
import { InMemoryGroupsRepository } from '../utils/tests/in-memory-repositories/in-memory-groups.repository'
import { groupTransactionsFactory } from './group-transactions.factory'

describe('groupTransactionsFactory', () => {
  let groupsRepository: GroupsRepository
  let groupTransactionsRepository: GroupTransactionsRepository

  beforeEach(() => {
    groupsRepository = new InMemoryGroupsRepository()
    groupTransactionsRepository = new InMemoryGroupTransactionsRepository()
  })

  it('should return a GroupTransactionsController instance', () => {
    const controller = groupTransactionsFactory(groupsRepository, groupTransactionsRepository)
    expect(controller).toBeInstanceOf(GroupTransactionsController)
  })
})
