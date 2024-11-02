import type { CreateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/create-group-transaction.dto'
import type { UpdateGroupTransactionDto } from '@fair-pact/contracts/groups/dtos/update-group-transaction.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GroupTransactionsController } from '../controllers/group-transactions.controller'

export class GroupTransactionsRoutes {
  constructor(private readonly groupTransactionsController: GroupTransactionsController) {}

  async getGroupTransactionById(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { id: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { id } = request.params
    const { statusCode, data } = await this.groupTransactionsController.getGroupTransactionById({
      id,
      userId
    })
    reply.status(statusCode).send({ data })
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
    const { statusCode, data } =
      await this.groupTransactionsController.getGroupTransactionsByGroupId({
        groupId,
        userId
      })
    reply.status(statusCode).send({ data })
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
    const { statusCode } = await this.groupTransactionsController.createGroupTransaction({
      ...data,
      groupId,
      createdBy: userId
    })
    reply.status(statusCode).send()
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
    const { statusCode } = await this.groupTransactionsController.updateGroupTransaction({
      ...data,
      id,
      groupId
    })
    reply.status(statusCode).send()
  }

  async deleteGroupTransaction(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.id
    const { statusCode } = await this.groupTransactionsController.deleteGroupTransaction({ id })
    reply.status(statusCode).send()
  }
}
