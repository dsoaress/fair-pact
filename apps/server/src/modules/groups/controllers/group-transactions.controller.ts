import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { CreateGroupTransactionDto } from '../dtos/create-group-transaction.dto'
import type { DeleteGroupTransactionDto } from '../dtos/delete-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '../dtos/update-group-transaction.dto'
import type { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import type { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import type { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transacrtion.use-case'

export class GroupTransactionsController {
  constructor(
    private readonly createGroupTransectionUseCase: CreateGroupTransactionUseCase,
    private readonly updateGroupTransectionUseCase: UpdateGroupTransactionUseCase,
    private readonly deleteGroupTransectionUseCase: DeleteGroupTransactionUseCase
  ) {}

  async createGroupTransection(data: CreateGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.createGroupTransectionUseCase.execute(data)
    return { statusCode: httpStatusCode.CREATED }
  }

  async updateGroupTransection(data: UpdateGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.updateGroupTransectionUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }

  async deleteGroupTransection(data: DeleteGroupTransactionDto): Promise<HttpResponse<void>> {
    await this.deleteGroupTransectionUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }
}
