import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { CreateGroupTransactionDto } from '../dtos/create-group-transaction.dto'
import type { DeleteGroupTransactionDto } from '../dtos/delete-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '../dtos/update-group-transaction.dto'
import type { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import type { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import type { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transacrtion.use-case'

export class GroupTransactionsController {
  constructor(
    private readonly createGroupTransactionUseCase: CreateGroupTransactionUseCase,
    private readonly updateGroupTransactionUseCase: UpdateGroupTransactionUseCase,
    private readonly deleteGroupTransactionUseCase: DeleteGroupTransactionUseCase
  ) {}

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
