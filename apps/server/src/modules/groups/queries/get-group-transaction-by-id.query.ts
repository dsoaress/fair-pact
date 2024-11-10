import {
  type GetGroupTransactionByIdInputDto,
  type GetGroupTransactionByIdOutputDto,
  getGroupTransactionByIdInputValidator
} from 'contracts'

import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupTransactionsDao } from '../daos/group-transactions.dao'

export class GetGroupTransactionByIdQuery
  implements Query<GetGroupTransactionByIdInputDto, Promise<GetGroupTransactionByIdOutputDto>>
{
  constructor(private readonly groupTransactionsDao: GroupTransactionsDao) {}

  async execute(data: GetGroupTransactionByIdInputDto): Promise<GetGroupTransactionByIdOutputDto> {
    const parsedData = getGroupTransactionByIdInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const groupTransaction = await this.groupTransactionsDao.getGroupTransactionById(
      parsedData.data
    )
    if (!groupTransaction) throw new NotFoundException('GroupTransaction')
    return groupTransaction
  }
}
