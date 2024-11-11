import {
  type GetGroupTransactionByIdInputDTO,
  type GetGroupTransactionByIdOutputDTO,
  getGroupTransactionByIdInputValidator
} from 'contracts'

import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupTransactionsDAO } from '../daos/group-transactions.dao'

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
