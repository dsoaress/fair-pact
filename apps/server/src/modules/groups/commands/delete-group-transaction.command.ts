import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import type { DeleteGroupTransactionDTO } from '../dtos/delete-group-transaction.dto'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import { deleteGroupTransactionValidator } from '../validators/delete-group-transaction.validator'

export class DeleteGroupTransactionCommand
  implements Command<DeleteGroupTransactionDTO, Promise<void>>
{
  constructor(private readonly groupTransactionsRepository: GroupTransactionsRepository) {}

  async execute(data: DeleteGroupTransactionDTO): Promise<void> {
    const parsedData = deleteGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id } = parsedData.data
    const transaction = await this.groupTransactionsRepository.findById(id)
    if (!transaction) throw new NotFoundException('Transaction')
    await this.groupTransactionsRepository.delete(id)
  }
}
