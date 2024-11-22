import type { HttpServer } from '@/shared/base/http-server'

import { CreateGroupTransactionCommand } from './commands/create-group-transaction.command'
import { CreateGroupCommand } from './commands/create-group.command'
import { DeleteGroupTransactionCommand } from './commands/delete-group-transaction.command'
import { DeleteGroupCommand } from './commands/delete-group.command'
import { JoinGroupCommand } from './commands/join-group.command'
import { RemoveGroupMemberCommand } from './commands/remove-group-member.command'
import { UpdateGroupTransactionCommand } from './commands/update-group-transaction.command'
import { UpdateGroupCommand } from './commands/update-group.command'
import { GroupTransactionsController } from './controllers/group-transactions.controller'
import { GroupsController } from './controllers/groups.controller'
import type { GroupTransactionsDAO } from './daos/group-transactions.dao'
import type { GroupsDAO } from './daos/groups.dao'
import { GetGroupByIdQuery } from './queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from './queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from './queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from './queries/get-groups.query'
import type { GroupTransactionsRepository } from './repositories/group-transactions.repository'
import type { GroupsRepository } from './repositories/groups.repository'

type Input = {
  server: HttpServer
  groupsDAO: GroupsDAO
  groupTransactionsDAO: GroupTransactionsDAO
  groupsRepository: GroupsRepository
  groupTransactionsRepository: GroupTransactionsRepository
}

export function groupsModule({
  groupTransactionsDAO,
  groupTransactionsRepository,
  groupsDAO,
  groupsRepository,
  server
}: Input): void {
  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDAO)
  const getGroupTransactionByIdQuery = new GetGroupTransactionByIdQuery(groupTransactionsDAO)
  const getGroupTransactionsByGroupIdQuery = new GetGroupTransactionsByGroupIdQuery(
    groupTransactionsDAO
  )
  const getGroupsQuery = new GetGroupsQuery(groupsDAO)
  const createGroupCommand = new CreateGroupCommand(groupsRepository)
  const addGroupMemberCommand = new JoinGroupCommand(groupsRepository)
  const removeGroupMemberCommand = new RemoveGroupMemberCommand(groupsRepository)
  const updateGroupCommand = new UpdateGroupCommand(groupsRepository)
  const deleteGroupCommand = new DeleteGroupCommand(groupsRepository)
  const createGroupTransactionCommand = new CreateGroupTransactionCommand(
    groupsRepository,
    groupTransactionsRepository
  )
  const updateGroupTransactionCommand = new UpdateGroupTransactionCommand(
    groupsRepository,
    groupTransactionsRepository
  )
  const deleteGroupTransactionCommand = new DeleteGroupTransactionCommand(
    groupTransactionsRepository
  )
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

  groupsController.initialize()
  groupTransactionsController.initialize()
}
