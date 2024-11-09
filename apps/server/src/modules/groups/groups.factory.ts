import { drizzleService } from '@/infra/database/drizzle/drizzle.service'
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
import { GroupTransactionsDao } from './daos/group-transactions.dao'
import { GroupsDao } from './daos/groups.dao'
import { GetGroupByIdQuery } from './queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from './queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from './queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from './queries/get-groups.query'
import { GroupTransactionsRepository } from './repositories/group-transactions.repository'
import { GroupsRepository } from './repositories/groups.repository'

type Output = {
  groupsController: GroupsController
  groupTransactionsController: GroupTransactionsController
}

export function groupsFactory(): Output {
  const groupsDao = new GroupsDao(drizzleService)
  const groupTransactionsDao = new GroupTransactionsDao(drizzleService)
  const groupsRepository = new GroupsRepository(drizzleService)
  const groupTransactionsRepository = new GroupTransactionsRepository(drizzleService)

  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDao)
  const getGroupsQuery = new GetGroupsQuery(groupsDao)
  const createGroupCommand = new CreateGroupCommand(groupsRepository)
  const addGroupMemberCommand = new JoinGroupCommand(groupsRepository)
  const removeGroupMemberCommand = new RemoveGroupMemberCommand(groupsRepository)
  const updateGroupCommand = new UpdateGroupCommand(groupsRepository)
  const deleteGroupCommand = new DeleteGroupCommand(groupsRepository)

  const getGroupTransactionByIdQuery = new GetGroupTransactionByIdQuery(groupTransactionsDao)
  const getGroupTransactionsByGroupIdQuery = new GetGroupTransactionsByGroupIdQuery(
    groupTransactionsDao
  )
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
