import type { CreateGroupTransactionDTO, UpdateGroupTransactionDTO } from 'contracts'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { CreateGroupTransactionCommand } from '../commands/create-group-transaction.command'
import type { DeleteGroupTransactionCommand } from '../commands/delete-group-transaction.command'
import type { UpdateGroupTransactionCommand } from '../commands/update-group-transaction.command'
import type { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import type { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'

export class GroupTransactionsController {
  constructor(
    private readonly GetGroupTransactionByIdQuery: GetGroupTransactionByIdQuery,
    private readonly GetGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery,
    private readonly createGroupTransactionCommand: CreateGroupTransactionCommand,
    private readonly updateGroupTransactionCommand: UpdateGroupTransactionCommand,
    private readonly deleteGroupTransactionCommand: DeleteGroupTransactionCommand
  ) {}

  async getGroupTransactionById(
    request: FastifyRequest<{ Params: { groupTransactionId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const id = request.params.groupTransactionId
    const groupTransaction = await this.GetGroupTransactionByIdQuery.execute({ id, memberId })
    reply.status(httpStatusCode.OK).send({ data: groupTransaction })
  }

  async getGroupTransactionsByGroupId(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const { groupId } = request.params
    const groupTransaction = await this.GetGroupTransactionsByGroupIdQuery.execute({
      groupId,
      memberId
    })
    reply.status(httpStatusCode.OK).send({ data: groupTransaction })
  }

  async createGroupTransaction(
    request: FastifyRequest<{
      Params: { groupId: string }
      Body: Omit<CreateGroupTransactionDTO, 'groupId' | 'createdBy'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const { groupId } = request.params
    const data = request.body
    await this.createGroupTransactionCommand.execute({
      ...data,
      groupId,
      createdBy: memberId
    })
    reply.status(httpStatusCode.CREATED).send()
  }

  async updateGroupTransaction(
    request: FastifyRequest<{
      Params: { groupTransactionId: string; groupId: string }
      Body: Omit<UpdateGroupTransactionDTO, 'id' | 'groupId'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { groupTransactionId: id, groupId } = request.params
    const data = request.body
    // TODO: maybe updatedBy?
    const memberId = request.user.sub
    await this.updateGroupTransactionCommand.execute({ ...data, id, groupId, memberId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroupTransaction(
    request: FastifyRequest<{ Params: { groupTransactionId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.groupTransactionId
    await this.deleteGroupTransactionCommand.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
