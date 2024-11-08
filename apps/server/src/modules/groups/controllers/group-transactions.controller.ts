import type { CreateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/create-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/update-group-transaction.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import type { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'
import type { CreateGroupTransactionUseCase } from '../use-cases/create-group-transaction.use-case'
import type { DeleteGroupTransactionUseCase } from '../use-cases/delete-group-transaction.use-case'
import type { UpdateGroupTransactionUseCase } from '../use-cases/update-group-transaction.use-case'

export class GroupTransactionsController {
  constructor(
    private readonly GetGroupTransactionByIdQuery: GetGroupTransactionByIdQuery,
    private readonly GetGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery,
    private readonly createGroupTransactionUseCase: CreateGroupTransactionUseCase,
    private readonly updateGroupTransactionUseCase: UpdateGroupTransactionUseCase,
    private readonly deleteGroupTransactionUseCase: DeleteGroupTransactionUseCase
  ) {}

  async getGroupTransactionById(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { id: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { id } = request.params
    const groupTransaction = await this.GetGroupTransactionByIdQuery.execute({ id, userId })
    reply.status(httpStatusCode.OK).send({ data: groupTransaction })
  }

  async getGroupTransactionsByGroupId(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    const groupTransaction = await this.GetGroupTransactionsByGroupIdQuery.execute({
      groupId,
      userId
    })
    reply.status(httpStatusCode.OK).send({ data: groupTransaction })
  }

  async createGroupTransaction(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { groupId: string }
      Body: Omit<CreateGroupTransactionDto, 'groupId' | 'createdBy'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    const data = request.body
    await this.createGroupTransactionUseCase.execute({
      ...data,
      groupId,
      createdBy: userId
    })
    reply.status(httpStatusCode.CREATED).send()
  }

  async updateGroupTransaction(
    request: FastifyRequest<{
      Params: { id: string; groupId: string }
      Body: Omit<UpdateGroupTransactionDto, 'id' | 'groupId'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id, groupId } = request.params
    const data = request.body
    await this.updateGroupTransactionUseCase.execute({ ...data, id, groupId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroupTransaction(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.id
    await this.deleteGroupTransactionUseCase.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
