import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { DeleteGroupTransactionDto } from '../dtos/delete-group-transaction.dto'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import { deleteGroupTransactionValidator } from '../validators/delete-group-transaction.validator'

export class DeleteGroupTransactionUseCase
  implements UseCase<DeleteGroupTransactionDto, Promise<void>>
{
  constructor(private readonly groupTransactionsRepository: GroupTransactionsRepository) {}

  async execute(data: DeleteGroupTransactionDto): Promise<void> {
    const parsedData = deleteGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id } = parsedData.data
    const transaction = await this.groupTransactionsRepository.findById(id)
    if (!transaction) throw new NotFoundException('Transaction')
    await this.groupTransactionsRepository.delete(id)
  }
}
