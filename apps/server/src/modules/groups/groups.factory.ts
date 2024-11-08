import { drizzleService } from '@/infra/database/drizzle/drizzle.service'

import { GroupMembersController } from './controllers/group-members.controller'
import { GroupTransactionsController } from './controllers/group-transactions.controller'
import { GroupsController } from './controllers/groups.controller'
import { GroupTransactionsDao } from './daos/group-transactions.dao'
import { GroupsDao } from './daos/groups.dao'
import { GetGroupByIdQuery } from './queries/get-group-by-id.query'
import { GetGroupTransactionByIdQuery } from './queries/get-group-transaction-by-id.query'
import { GetGroupTransactionsByGroupIdQuery } from './queries/get-group-transactions-by-group-id.query'
import { GetGroupsQuery } from './queries/get-groups.query'
import { GroupMembersRepository } from './repositories/group-members.repository'
import { GroupTransactionsRepository } from './repositories/group-transactions.repository'
import { GroupsRepository } from './repositories/groups.repository'
import { CreateGroupMemberUseCase } from './use-cases/create-group-member.use-case'
import { CreateGroupTransactionUseCase } from './use-cases/create-group-transaction.use-case'
import { CreateGroupUseCase } from './use-cases/create-group.use-case'
import { DeleteGroupMemberUseCase } from './use-cases/delete-group-member.use-case'
import { DeleteGroupTransactionUseCase } from './use-cases/delete-group-transaction.use-case'
import { DeleteGroupUseCase } from './use-cases/delete-group.use-case'
import { UpdateGroupTransactionUseCase } from './use-cases/update-group-transaction.use-case'
import { UpdateGroupUseCase } from './use-cases/update-group.use-case'

type Output = {
  groupsController: GroupsController
  groupMembersController: GroupMembersController
  groupTransactionsController: GroupTransactionsController
}

export function groupsFactory(): Output {
  const groupsDao = new GroupsDao(drizzleService)
  const groupTransactionsDao = new GroupTransactionsDao(drizzleService)
  const groupsRepository = new GroupsRepository(drizzleService)
  const groupMembersRepository = new GroupMembersRepository(drizzleService)
  const groupTransactionsRepository = new GroupTransactionsRepository(drizzleService)

  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDao)
  const getGroupsQuery = new GetGroupsQuery(groupsDao)
  const createGroupUseCase = new CreateGroupUseCase(groupsRepository)
  const updateGroupUseCase = new UpdateGroupUseCase(groupsRepository)
  const deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository)

  const createGroupMemberUseCase = new CreateGroupMemberUseCase(
    groupsRepository,
    groupMembersRepository
  )
  const deleteGroupMemberUseCase = new DeleteGroupMemberUseCase(groupMembersRepository)

  const getGroupTransactionByIdQuery = new GetGroupTransactionByIdQuery(groupTransactionsDao)
  const getGroupTransactionsByGroupIdQuery = new GetGroupTransactionsByGroupIdQuery(
    groupTransactionsDao
  )
  const createGroupTransactionUseCase = new CreateGroupTransactionUseCase(
    groupsRepository,
    groupTransactionsRepository
  )
  const updateGroupTransactionUseCase = new UpdateGroupTransactionUseCase(
    groupsRepository,
    groupTransactionsRepository
  )
  const deleteGroupTransactionUseCase = new DeleteGroupTransactionUseCase(
    groupTransactionsRepository
  )

  const groupsController = new GroupsController(
    getGroupByIdQuery,
    getGroupsQuery,
    createGroupUseCase,
    updateGroupUseCase,
    deleteGroupUseCase
  )

  const groupMembersController = new GroupMembersController(
    createGroupMemberUseCase,
    deleteGroupMemberUseCase
  )

  const groupTransactionsController = new GroupTransactionsController(
    getGroupTransactionByIdQuery,
    getGroupTransactionsByGroupIdQuery,
    createGroupTransactionUseCase,
    updateGroupTransactionUseCase,
    deleteGroupTransactionUseCase
  )

  return {
    groupsController,
    groupMembersController,
    groupTransactionsController
  }
}
