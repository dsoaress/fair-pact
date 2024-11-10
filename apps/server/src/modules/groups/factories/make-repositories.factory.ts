import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import { GroupsRepository } from '../repositories/groups.repository'

type Output = {
  groupsRepository: GroupsRepository
  groupTransactionsRepository: GroupTransactionsRepository
}

export function makeRepositoriesFactory(): Output {
  const groupsRepository = new GroupsRepository(drizzleService)
  const groupTransactionsRepository = new GroupTransactionsRepository(drizzleService)

  return {
    groupsRepository,
    groupTransactionsRepository
  }
}
