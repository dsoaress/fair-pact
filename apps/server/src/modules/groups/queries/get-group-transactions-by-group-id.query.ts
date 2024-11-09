import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import type { GetGroupTransactionsByGroupIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-output.dto'
import { getGroupTransactionsByGroupIdInputValidator } from '@fair-pact/contracts/groups/validators/get-group-transactions-by-group-id-input.validator'

import type { GroupTransactionsDao } from '../daos/group-transactions.dao'

export class GetGroupTransactionsByGroupIdQuery
  implements
    Query<GetGroupTransactionsByGroupIdInputDto, Promise<GetGroupTransactionsByGroupIdOutputDto>>
{
  constructor(private readonly groupTransactionsDao: GroupTransactionsDao) {}

  async execute(
    data: GetGroupTransactionsByGroupIdInputDto
  ): Promise<GetGroupTransactionsByGroupIdOutputDto> {
    const parsedData = getGroupTransactionsByGroupIdInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const groupTransaction = await this.groupTransactionsDao.getGroupTransactionsByGroupId(
      parsedData.data
    )
    if (!groupTransaction) throw new NotFoundException('GroupTransaction')
    return groupTransaction
  }
}
