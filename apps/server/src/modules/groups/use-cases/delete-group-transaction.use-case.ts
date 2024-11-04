import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { DeleteGroupTransactionDto } from '../dtos/delete-group-transaction.dto'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import type { UpdateGroupMembersBalanceService } from '../services/update-group-members-balance.service'
import { deleteGroupTransactionValidator } from '../validators/delete-group-transaction.validator'

export class DeleteGroupTransactionUseCase
  implements UseCase<DeleteGroupTransactionDto, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository,
    private readonly updateGroupMembersBalanceService: UpdateGroupMembersBalanceService
  ) {}

  async execute(data: DeleteGroupTransactionDto): Promise<void> {
    const parsedData = deleteGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id, groupId } = parsedData.data
    const [group, transaction] = await Promise.all([
      this.groupsRepository.findById(groupId),
      this.groupTransactionsRepository.findById(id)
    ])
    if (!group) throw new NotFoundException('Group')
    if (!transaction) throw new NotFoundException('Transaction')
    await Promise.all([
      this.groupTransactionsRepository.delete(id),
      this.updateGroupMembersBalanceService.execute({
        groupId,
        participants: transaction.participants
      })
    ])
  }
}
