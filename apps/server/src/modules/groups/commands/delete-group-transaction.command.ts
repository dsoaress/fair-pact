import { type DeleteGroupTransactionDto, deleteGroupTransactionValidator } from 'contracts'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'

export class DeleteGroupTransactionCommand
  implements Command<DeleteGroupTransactionDto, Promise<void>>
{
  constructor(private readonly groupTransactionsRepository: GroupTransactionsRepository) {}

  async execute(data: DeleteGroupTransactionDto): Promise<void> {
    const parsedData = deleteGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id } = parsedData.data
    const transaction = await this.groupTransactionsRepository.findById(id)
    if (!transaction) throw new NotFoundException('Transaction')
    await this.groupTransactionsRepository.delete(id)
  }
}
