import { drizzleSevice } from '@/infra/database/drizzle/drizzle.service'

import { GroupMembersController } from './controllers/group-members.controller'
import { GroupTransactionsController } from './controllers/group-transactions.controller'
import { GroupsController } from './controllers/groups.controller'
import { GroupsDao } from './daos/groups.dao'
import { GetGroupByIdQuery } from './queries/get-group-by-id.query'
import { GetGroupsQuery } from './queries/get-groups.query'
import { GroupMembersRepository } from './repositories/group-members.repository'
import { GroupTransactionsRepository } from './repositories/group-transactions.respository'
import { GroupsRepository } from './repositories/groups.repository'
import { GroupMembersRoutes } from './routes/group-members.routes'
import { GroupTransactionsRoutes } from './routes/group-transactions.routes'
import { GroupsRoutes } from './routes/groups.routes'
import { CreateGroupMemberUseCase } from './use-cases/create-group-member.use-case'
import { CreateGroupTransactionUseCase } from './use-cases/create-group-transaction.use-case'
import { CreateGroupUseCase } from './use-cases/create-group.use-case'
import { DeleteGroupMemberUseCase } from './use-cases/delete-group-member.use-case'
import { DeleteGroupTransactionUseCase } from './use-cases/delete-group-transaction.use-case'
import { DeleteGroupUseCase } from './use-cases/delete-group.use-case'
import { UpdateGroupTransactionUseCase } from './use-cases/update-group-transacrtion.use-case'
import { UpdateGroupUseCase } from './use-cases/update-group.use-case'

type Output = {
  groupRoutes: GroupsRoutes
  groupMembersRoutes: GroupMembersRoutes
  groupTransactionsRoutes: GroupTransactionsRoutes
}

export function groupsFactory(): Output {
  const groupsDao = new GroupsDao(drizzleSevice)
  const groupsRepository = new GroupsRepository(drizzleSevice)
  const groupMembersRepository = new GroupMembersRepository(drizzleSevice)
  const groupTransactionsRepository = new GroupTransactionsRepository(drizzleSevice)

  const getGroupByIdQuery = new GetGroupByIdQuery(groupsDao)
  const getGroupsQuery = new GetGroupsQuery(groupsDao)
  const createGroupUseCase = new CreateGroupUseCase(groupsRepository, groupMembersRepository)
  const updateGroupUseCase = new UpdateGroupUseCase(groupsRepository)
  const deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository)

  const createGroupMemberUseCase = new CreateGroupMemberUseCase(
    groupsRepository,
    groupMembersRepository
  )
  const deleteGroupMemberUseCase = new DeleteGroupMemberUseCase(groupMembersRepository)

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
    createGroupTransactionUseCase,
    updateGroupTransactionUseCase,
    deleteGroupTransactionUseCase
  )

  const groupRoutes = new GroupsRoutes(groupsController)
  const groupMembersRoutes = new GroupMembersRoutes(groupMembersController)
  const groupTransactionsRoutes = new GroupTransactionsRoutes(groupTransactionsController)

  return {
    groupRoutes,
    groupMembersRoutes,
    groupTransactionsRoutes
  }
}
