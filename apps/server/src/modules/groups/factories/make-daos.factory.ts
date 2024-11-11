import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { GroupTransactionsDAO } from '../daos/group-transactions.dao'
import { GroupsDAO } from '../daos/groups.dao'

type Output = {
  groupsDAO: GroupsDAO
  groupTransactionsDAO: GroupTransactionsDAO
}

export function makeDAOsFactory(): Output {
  const groupsDAO = new GroupsDAO(drizzleService)
  const groupTransactionsDAO = new GroupTransactionsDAO(drizzleService)

  return {
    groupsDAO,
    groupTransactionsDAO
  }
}
