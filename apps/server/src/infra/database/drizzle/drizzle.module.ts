import type { CacheService } from '@/core/base/cache-service'
import type { GroupTransactionsDAO } from '@/modules/groups/daos/group-transactions.dao'
import type { GroupsDAO } from '@/modules/groups/daos/groups.dao'
import type { GroupTransactionsRepository } from '@/modules/groups/repositories/group-transactions.repository'
import type { GroupsRepository } from '@/modules/groups/repositories/groups.repository'
import { DrizzleGroupTransactionsDAO } from './daos/groups/drizzle-group-transactions.dao'
import { DrizzleGroupsDAO } from './daos/groups/drizzle-groups.dao'
import { DrizzleUsersDAO } from './daos/users/drizzle-users.dao'
import { drizzleService } from './drizzle.service'
import { DrizzleGroupTransactionsRepository } from './repositories/groups/drizzle-group-transactions.repository'
import { DrizzleGroupsRepository } from './repositories/groups/drizzle-groups.repository'
import { DrizzleSessionsRepository } from './repositories/users/drizzle-sessions.repository'
import { DrizzleUsersRepository } from './repositories/users/drizzle-users.repository'

type Input = {
  cacheService: CacheService
}

type Output = {
  usersDAO: DrizzleUsersDAO
  groupsDAO: GroupsDAO
  groupTransactionsDAO: GroupTransactionsDAO
  sessionsRepository: DrizzleSessionsRepository
  usersRepository: DrizzleUsersRepository
  groupTransactionsRepository: GroupTransactionsRepository
  groupsRepository: GroupsRepository
}

export function drizzleModule({ cacheService }: Input): Output {
  const usersDAO = new DrizzleUsersDAO(drizzleService, cacheService)
  const groupsDAO = new DrizzleGroupsDAO(drizzleService, cacheService)
  const groupTransactionsDAO = new DrizzleGroupTransactionsDAO(drizzleService, cacheService)
  const sessionsRepository = new DrizzleSessionsRepository(drizzleService)
  const usersRepository = new DrizzleUsersRepository(drizzleService, cacheService)
  const groupTransactionsRepository = new DrizzleGroupTransactionsRepository(
    drizzleService,
    cacheService
  )
  const groupsRepository = new DrizzleGroupsRepository(drizzleService, cacheService)

  return {
    usersDAO,
    groupsDAO,
    groupTransactionsDAO,
    sessionsRepository,
    usersRepository,
    groupTransactionsRepository,
    groupsRepository
  }
}
