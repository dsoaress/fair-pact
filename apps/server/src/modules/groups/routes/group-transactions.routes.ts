import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GroupTransactionsController } from '../controllers/group-transactions.controller'
import type { CreateGroupTransactionDto } from '../dtos/create-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '../dtos/update-group-transaction.dto'

export class GroupTransactionsRoutes {
  constructor(private readonly groupTransactionsController: GroupTransactionsController) {}

  async createGroupTransaction(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Omit<CreateGroupTransactionDto, 'createdBy'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const data = request.body
    const { statusCode } = await this.groupTransactionsController.createGroupTransaction({
      ...data,
      createdBy: userId
    })
    reply.send(statusCode)
  }

  async updateGroupTransaction(
    request: FastifyRequest<{
      Params: { id: string }
      Body: Omit<UpdateGroupTransactionDto, 'id'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.id
    const data = request.body
    const { statusCode } = await this.groupTransactionsController.updateGroupTransaction({
      ...data,
      id
    })
    reply.send(statusCode)
  }

  async deleteGroupTransaction(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.id
    const { statusCode } = await this.groupTransactionsController.deleteGroupTransaction({ id })
    reply.send(statusCode)
  }
}
