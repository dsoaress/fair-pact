import type { Query } from '@/core/base/query'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import type { GroupTransactionsDAO } from '../daos/group-transactions.dao'
import type { GetGroupTransactionsByGroupIdInputDTO } from '../dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDTO } from '../dtos/get-group-transactions-by-group-id-output.dto'
import { getGroupTransactionsByGroupIdInputValidator } from '../validators/get-group-transactions-by-group-id-input.validator'

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
