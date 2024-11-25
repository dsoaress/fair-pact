import type { Command } from '@/core/base/command'

import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { UpdateGroupTransactionDTO } from '../dtos/update-group-transaction.dto'
import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { updateGroupTransactionValidator } from '../validators/update-group-transaction.validator'

export class UpdateGroupTransactionCommand
  implements Command<UpdateGroupTransactionDTO, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository
  ) {}

  async execute(data: UpdateGroupTransactionDTO): Promise<void> {
    const parsedData = updateGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id, groupId } = parsedData.data
    const [group, transaction] = await Promise.all([
      this.groupsRepository.findById(groupId),
      this.groupTransactionsRepository.findById(id)
    ])
    if (!group) throw new NotFoundException('Group')
    if (!transaction) throw new NotFoundException('Transaction')
    this.updateGroupTransaction(transaction, parsedData.data)
    await this.groupTransactionsRepository.update(transaction)
  }

  private updateGroupTransaction(
    originalTransaction: GroupTransactionModel,
    data: UpdateGroupTransactionDTO
  ): void {
    originalTransaction.name = data.name ?? originalTransaction.name
    originalTransaction.amount = data.amount ?? originalTransaction.amount
    originalTransaction.payerMemberId =
      IdValueObject.create(data.payerMemberId) || originalTransaction.payerMemberId
    originalTransaction.groupId = IdValueObject.create(data.groupId) || originalTransaction.groupId
    originalTransaction.participants = data.participants
      ? data.participants.map(p => ({
          memberId: IdValueObject.create(p.memberId),
          amount: p.amount
        }))
      : originalTransaction.participants
    originalTransaction.updatedBy = IdValueObject.create(data.memberId)
    originalTransaction.updatedAt = new Date()
  }
}
