import type { Query } from '@/core/base/query'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import type { GroupTransactionsDAO } from '../daos/group-transactions.dao'
import type { GetGroupTransactionByIdInputDTO } from '../dtos/get-group-transaction-by-id-input.dto'
import type { GetGroupTransactionByIdOutputDTO } from '../dtos/get-group-transaction-by-id-output.dto'
import { getGroupTransactionByIdInputValidator } from '../validators/get-group-transaction-by-id-input.validator'

export class GetGroupTransactionByIdQuery
  implements Query<GetGroupTransactionByIdInputDTO, Promise<GetGroupTransactionByIdOutputDTO>>
{
  constructor(private readonly groupTransactionsDAO: GroupTransactionsDAO) {}

  async execute(data: GetGroupTransactionByIdInputDTO): Promise<GetGroupTransactionByIdOutputDTO> {
    const parsedData = getGroupTransactionByIdInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const groupTransaction = await this.groupTransactionsDAO.getGroupTransactionById(
      parsedData.data
    )
    if (!groupTransaction) throw new NotFoundException('GroupTransaction')
    return groupTransaction
  }
}
