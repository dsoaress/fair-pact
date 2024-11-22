import type { HttpServer } from '@/shared/base/http-server'

import { GroupTransactionsController } from '../controllers/group-transactions.controller'
import { GroupsController } from '../controllers/groups.controller'
import { makeCommandsFactory } from './make-commands.factory'
import { makeDAOsFactory } from './make-daos.factory'
import { makeQueriesFactory } from './make-queries.factory'
import { makeRepositoriesFactory } from './make-repositories.factory'

type Input = {
  server: HttpServer
}

type Output = {
  groupsController: GroupsController
  groupTransactionsController: GroupTransactionsController
}

export function makeGroupsControllersFactory({ server }: Input): Output {
  const { groupsDAO, groupTransactionsDAO } = makeDAOsFactory()
  const { groupsRepository, groupTransactionsRepository } = makeRepositoriesFactory()
  const {
    getGroupByIdQuery,
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    getGroupsQuery
  } = makeQueriesFactory({ groupsDAO, groupTransactionsDAO })
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
    server,
    getGroupByIdQuery,
    getGroupsQuery,
    createGroupCommand,
    addGroupMemberCommand,
    removeGroupMemberCommand,
    updateGroupCommand,
    deleteGroupCommand
  )

  const groupTransactionsController = new GroupTransactionsController(
    server,
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
