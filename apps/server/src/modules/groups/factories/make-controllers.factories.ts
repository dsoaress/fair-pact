import { GroupTransactionsController } from '../controllers/group-transactions.controller'
import { GroupsController } from '../controllers/groups.controller'
import { makeCommandsFactory } from './make-commands.factory'
import { makeDaosFactory } from './make-daos.factory'
import { makeQueriesFactory } from './make-queries.factory'
import { makeRepositoriesFactory } from './make-repositories.factory'

type Output = {
  groupsController: GroupsController
  groupTransactionsController: GroupTransactionsController
}

export function makeControllersFactory(): Output {
  const { groupsDao, groupTransactionsDao } = makeDaosFactory()
  const { groupsRepository, groupTransactionsRepository } = makeRepositoriesFactory()
  const {
    getGroupByIdQuery,
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    getGroupsQuery
  } = makeQueriesFactory({ groupsDao, groupTransactionsDao })
  const {
    addGroupMemberCommand,
    createGroupCommand,
    createGroupTransactionCommand,
    deleteGroupCommand,
    deleteGroupTransactionCommand,
    removeGroupMemberCommand,
    updateGroupCommand,
    updateGroupTransactionCommand
  } = makeCommandsFactory({ groupsRepository, groupTransactionsRepository })

  const groupsController = new GroupsController(
    getGroupByIdQuery,
    getGroupsQuery,
    createGroupCommand,
    addGroupMemberCommand,
    removeGroupMemberCommand,
    updateGroupCommand,
    deleteGroupCommand
  )

  const groupTransactionsController = new GroupTransactionsController(
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    createGroupTransactionCommand,
    updateGroupTransactionCommand,
    deleteGroupTransactionCommand
  )

  return {
    groupsController,
    groupTransactionsController
  }
}
