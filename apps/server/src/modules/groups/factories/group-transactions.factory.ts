import { GroupTransactionsController } from '../controllers/group-transactions.controller'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { UpdateGroupMembersBalanceService } from '../services/update-group-members-balance.service'
import { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transacrtion.use-case'

export function groupTransactionsFactory(
  groupsRepository: GroupsRepository,
  groupMembersRepository: GroupMembersRepository,
  groupTransactionsRepository: GroupTransactionsRepository
): GroupTransactionsController {
  const updateGroupMembersBalanceService = new UpdateGroupMembersBalanceService(
    groupMembersRepository
  )
  const createGroupTransactionUseCase = new CreateGroupTransactionUseCase(
    groupsRepository,
    groupTransactionsRepository
  )
  const updateGroupTransactionUseCase = new UpdateGroupTransactionUseCase(
    groupsRepository,
    groupTransactionsRepository,
    updateGroupMembersBalanceService
  )
  const deleteGroupTransactionUseCase = new DeleteGroupTransactionUseCase(
    groupsRepository,
    groupTransactionsRepository,
    updateGroupMembersBalanceService
  )
  return new GroupTransactionsController(
    createGroupTransactionUseCase,
    updateGroupTransactionUseCase,
    deleteGroupTransactionUseCase
  )
}
