import {
  type GetGroupTransactionsByGroupIdInputDTO,
  type GetGroupTransactionsByGroupIdOutputDTO,
  getGroupTransactionsByGroupIdInputValidator
} from 'contracts'

import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupTransactionsDAO } from '../daos/group-transactions.dao'

export class GetGroupTransactionsByGroupIdQuery
  implements
    Query<GetGroupTransactionsByGroupIdInputDTO, Promise<GetGroupTransactionsByGroupIdOutputDTO>>
{
  constructor(private readonly groupTransactionsDAO: GroupTransactionsDAO) {}

  async execute(
    data: GetGroupTransactionsByGroupIdInputDTO
  ): Promise<GetGroupTransactionsByGroupIdOutputDTO> {
    const parsedData = getGroupTransactionsByGroupIdInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const groupTransaction = await this.groupTransactionsDAO.getGroupTransactionsByGroupId(
      parsedData.data
    )
    if (!groupTransaction) throw new NotFoundException('GroupTransaction')
    return groupTransaction
  }
}
