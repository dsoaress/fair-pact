import './docs/docs.module'

import type { HttpServer } from '@/core/base/http-server'
import { CreateGroupTransactionCommand } from '@/modules/groups/commands/create-group-transaction.command'
import { CreateGroupCommand } from '@/modules/groups/commands/create-group.command'
import { DeleteGroupTransactionCommand } from '@/modules/groups/commands/delete-group-transaction.command'
import { DeleteGroupCommand } from '@/modules/groups/commands/delete-group.command'
import { JoinGroupCommand } from '@/modules/groups/commands/join-group.command'
import { RemoveGroupMemberCommand } from '@/modules/groups/commands/remove-group-member.command'
import { UpdateGroupTransactionCommand } from '@/modules/groups/commands/update-group-transaction.command'
import { UpdateGroupCommand } from '@/modules/groups/commands/update-group.command'
import type { GroupTransactionsDAO } from '@/modules/groups/daos/group-transactions.dao'
import type { GroupsDAO } from '@/modules/groups/daos/groups.dao'
import { GetGroupByIdQuery } from '@/modules/groups/queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from '@/modules/groups/queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from '@/modules/groups/queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from '@/modules/groups/queries/get-groups.query'
import type { GroupTransactionsRepository } from '@/modules/groups/repositories/group-transactions.repository'
import type { GroupsRepository } from '@/modules/groups/repositories/groups.repository'
import { CreateOrUpdateUserCommand } from '@/modules/users/commands/create-or-update-user.command'
import { CreateSessionCommand } from '@/modules/users/commands/create-session.command'
import { RefreshSessionCommand } from '@/modules/users/commands/refresh-session.command'
import type { UsersDAO } from '@/modules/users/daos/users.dao'
import { GetUserProfileQuery } from '@/modules/users/queries/get-user-profile.query'
import type { SessionsRepository } from '@/modules/users/repositories/sessions.repository'
import type { UsersRepository } from '@/modules/users/repositories/users.repository'
import { GoogleOAuthService } from '@/modules/users/services/google-oauth.service'

import { GroupTransactionsController } from './controllers/group-transactions.controller'
import { GroupsController } from './controllers/groups.controller'
import { SessionsController } from './controllers/sessions.controller'
import { UsersControllers } from './controllers/users.controller'

type Input = {
  server: HttpServer
  groupsDAO: GroupsDAO
  groupTransactionsDAO: GroupTransactionsDAO
  groupsRepository: GroupsRepository
  groupTransactionsRepository: GroupTransactionsRepository
  usersDAO: UsersDAO
  usersRepository: UsersRepository
  sessionsRepository: SessionsRepository
}

export function httpModule({
  server,
  groupTransactionsDAO,
  groupTransactionsRepository,
  groupsDAO,
  groupsRepository,
  sessionsRepository,
  usersDAO,
  usersRepository
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
  const getUserProfileQuery = new GetUserProfileQuery(usersDAO)
  const createOrUpdateUserCommand = new CreateOrUpdateUserCommand(usersRepository)
  const createSessionCommand = new CreateSessionCommand(sessionsRepository)
  const refreshSessionCommand = new RefreshSessionCommand(sessionsRepository)
  const googleOAuthService = new GoogleOAuthService()

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
  const sessionsController = new SessionsController(
    server,
    createOrUpdateUserCommand,
    createSessionCommand,
    refreshSessionCommand,
    googleOAuthService
  )
  const usersController = new UsersControllers(server, getUserProfileQuery)

  groupsController.initialize()
  groupTransactionsController.initialize()
  sessionsController.initialize()
  usersController.initialize()
}
