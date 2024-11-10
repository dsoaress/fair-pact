import {
  IdValueObject,
  type UpdateGroupTransactionDto,
  updateGroupTransactionValidator
} from 'contracts'

import type { Command } from '@/shared/base/command'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import type { GroupsRepository } from '../repositories/groups.repository'

export class UpdateGroupTransactionCommand
  implements Command<UpdateGroupTransactionDto, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository
  ) {}

  async execute(data: UpdateGroupTransactionDto): Promise<void> {
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
    data: UpdateGroupTransactionDto
  ): void {
    originalTransaction.name = data.name ?? originalTransaction.name
    originalTransaction.amount = data.amount ?? originalTransaction.amount
    originalTransaction.payerUserId =
      IdValueObject.create(data.payerUserId) || originalTransaction.payerUserId
    originalTransaction.groupId = IdValueObject.create(data.groupId) || originalTransaction.groupId
    originalTransaction.participants = data.participants
      ? data.participants.map(p => ({
          userId: IdValueObject.create(p.userId),
          amount: p.amount
        }))
      : originalTransaction.participants
    originalTransaction.updatedBy = IdValueObject.create(data.userId)
    originalTransaction.updatedAt = new Date()
  }
}