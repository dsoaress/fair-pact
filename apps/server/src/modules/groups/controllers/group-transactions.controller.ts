import type { CreateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/create-group-transaction.dto'
import type { DeleteGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/delete-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/update-group-transaction.dto'

import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { GetGroupTransactionByIdInputDto } from '@fair-pact/contracts/src/groups/dtos/get-group-transaction-by-id-input.dto'
import type { GetGroupTransactionByIdOutputDto } from '@fair-pact/contracts/src/groups/dtos/get-group-transaction-by-id-output.dto'
import type { GetGroupTransactionsByGroupIdInputDto } from '@fair-pact/contracts/src/groups/dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/src/groups/dtos/get-group-transactions-by-group-id-output.dto'
import type { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import type { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'
import type { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import type { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import type { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transacrtion.use-case'

export class GroupTransactionsController {
  constructor(
    private readonly GetGroupTransactionByIdQuery: GetGroupTransactionByIdQuery,
    private readonly GetGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery,
    private readonly createGroupTransactionUseCase: CreateGroupTransactionUseCase,
    private readonly updateGroupTransactionUseCase: UpdateGroupTransactionUseCase,
    private readonly deleteGroupTransactionUseCase: DeleteGroupTransactionUseCase
  ) {}

  async getGroupTransactionById(
    data: GetGroupTransactionByIdInputDto
  ): Promise<HttpResponse<GetGroupTransactionByIdOutputDto>> {
    const groupTransaction = await this.GetGroupTransactionByIdQuery.execute(data)
    return { statusCode: httpStatusCode.OK, data: groupTransaction }
  }

  async getGroupTransactionsByGroupId(
    data: GetGroupTransactionsByGroupIdInputDto
  ): Promise<HttpResponse<GetGroupTransactionsByGroupIdOutputDto>> {
    const groupTransaction = await this.GetGroupTransactionsByGroupIdQuery.execute(data)
    return { statusCode: httpStatusCode.OK, data: groupTransaction }
  }

  async createGroupTransaction(data: CreateGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.createGroupTransactionUseCase.execute(data)
    return { statusCode: httpStatusCode.CREATED }
  }

  async updateGroupTransaction(data: UpdateGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.updateGroupTransactionUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }

  async deleteGroupTransaction(data: DeleteGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.deleteGroupTransactionUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }
}
