import { drizzleService } from '@/infra/database/drizzle/drizzle.service'

import { GroupTransactionsDao } from '../daos/group-transactions.dao'
import { GroupsDao } from '../daos/groups.dao'

type Output = {
  groupsDao: GroupsDao
  groupTransactionsDao: GroupTransactionsDao
}

export function makeDaosFactory(): Output {
  const groupsDao = new GroupsDao(drizzleService)
  const groupTransactionsDao = new GroupTransactionsDao(drizzleService)

  return {
    groupsDao,
    groupTransactionsDao
  }
}
