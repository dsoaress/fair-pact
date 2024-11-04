import { GroupTransactionsController } from '../controllers/group-transactions.controller'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transacrtion.use-case'

export function groupTransactionsFactory(
  groupsRepository: GroupsRepository,
  groupTransactionsRepository: GroupTransactionsRepository
): GroupTransactionsController {
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
  return new GroupTransactionsController(
    createGroupTransactionUseCase,
    updateGroupTransactionUseCase,
    deleteGroupTransactionUseCase
  )
}
