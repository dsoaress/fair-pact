import type { GroupTransactionsDao } from '../daos/group-transactions.dao'
import type { GroupsDao } from '../daos/groups.dao'
import { GetGroupByIdQuery } from '../queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from '../queries/get-groups.query'

type Input = {
  groupsDao: GroupsDao
  groupTransactionsDao: GroupTransactionsDao
}

type Output = {
  getGroupByIdQuery: GetGroupByIdQuery
  getGroupTransactionByIdQuery: GetGroupTransactionByIdQuery
  getGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery
  getGroupsQuery: GetGroupsQuery
}

export function makeQueriesFactory({ groupsDao, groupTransactionsDao }: Input): Output {
  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDao)
  const getGroupTransactionByIdQuery = new GetGroupTransactionByIdQuery(groupTransactionsDao)
  const getGroupTransactionsByGroupIdQuery = new GetGroupTransactionsByGroupIdQuery(
    groupTransactionsDao
  )
  const getGroupsQuery = new GetGroupsQuery(groupsDao)

  return {
    getGroupByIdQuery,
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    getGroupsQuery
  }
}
