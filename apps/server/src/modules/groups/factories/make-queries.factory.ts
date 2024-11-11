import type { GroupTransactionsDAO } from '../daos/group-transactions.dao'
import type { GroupsDAO } from '../daos/groups.dao'
import { GetGroupByIdQuery } from '../queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from '../queries/get-groups.query'

type Input = {
  groupsDAO: GroupsDAO
  groupTransactionsDAO: GroupTransactionsDAO
}

type Output = {
  getGroupByIdQuery: GetGroupByIdQuery
  getGroupTransactionByIdQuery: GetGroupTransactionByIdQuery
  getGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery
  getGroupsQuery: GetGroupsQuery
}

export function makeQueriesFactory({ groupsDAO, groupTransactionsDAO }: Input): Output {
  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDAO)
  const getGroupTransactionByIdQuery = new GetGroupTransactionByIdQuery(groupTransactionsDAO)
  const getGroupTransactionsByGroupIdQuery = new GetGroupTransactionsByGroupIdQuery(
    groupTransactionsDAO
  )
  const getGroupsQuery = new GetGroupsQuery(groupsDAO)

  return {
    getGroupByIdQuery,
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    getGroupsQuery
  }
}
