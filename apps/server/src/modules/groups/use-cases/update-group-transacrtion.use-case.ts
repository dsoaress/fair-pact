import type { UseCase } from '@/shared/base/use-case'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import { IdValueObject } from '@/shared/value-objects/id.value-object'
import type { UpdateGroupTransactionDto } from '../dtos/update-group-transaction.dto'
import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import type { UpdateGroupMembersBalanceService } from '../services/update-group-members-balance.service'
import { updateGroupTransactionValidator } from '../validators/update-group-transaction.validator'

export class UpdateGroupTransactionUseCase
  implements UseCase<UpdateGroupTransactionDto, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository,
    private readonly updateGroupMembersBalanceService: UpdateGroupMembersBalanceService
  ) {}

  async execute(data: UpdateGroupTransactionDto): Promise<void> {
    const parsedData = updateGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id, groupId } = parsedData.data
    const [group, transaction] = await Promise.all([
      this.groupsRepository.findById(groupId),
      this.groupTransactionsRepository.findById(id)
    ])
    if (!group) throw new NotFoundException('Group')
    if (!transaction) throw new NotFoundException('Transaction')
    this.updateGroupTransaction(transaction, parsedData.data)
    await Promise.all([
      this.groupTransactionsRepository.update(transaction),
      this.updateGroupMembersBalanceService.execute({
        groupId,
        participants: transaction.participants
      })
    ])
  }

  private updateGroupTransaction(
    originalTransaction: GroupTransactionModel,
    data: UpdateGroupTransactionDto
  ): void {
    originalTransaction.name = data.name || originalTransaction.name
    originalTransaction.amount = data.amount || originalTransaction.amount
    originalTransaction.payerMemberId =
      IdValueObject.create(data.payerMemberId) || originalTransaction.payerMemberId
    originalTransaction.groupId = IdValueObject.create(data.groupId) || originalTransaction.groupId
    originalTransaction.participants = data.participants
      ? data.participants.map(p => ({
          memberId: IdValueObject.create(p.memberId),
          amount: p.amount
        }))
      : originalTransaction.participants
    originalTransaction.updatedBy = IdValueObject.create(data.userId)
    originalTransaction.updatedAt = new Date()
  }
}
