import type { CreateGroupTransactionDTO } from 'contracts'

import type { Controller } from '@/shared/base/controller'
import { type HttpServer, httpStatusCode, permissions } from '@/shared/base/http-server'

import type { CreateGroupTransactionCommand } from '../commands/create-group-transaction.command'
import type { DeleteGroupTransactionCommand } from '../commands/delete-group-transaction.command'
import type { UpdateGroupTransactionCommand } from '../commands/update-group-transaction.command'
import type { GetGroupTransactionByIdQuery } from '../queries/get-group-transaction-by-id.query'
import type { GetGroupTransactionsByGroupIdQuery } from '../queries/get-group-transactions-by-group-id.query'

export class GroupTransactionsController implements Controller {
  constructor(
    private readonly server: HttpServer,
    private readonly GetGroupTransactionByIdQuery: GetGroupTransactionByIdQuery,
    private readonly GetGroupTransactionsByGroupIdQuery: GetGroupTransactionsByGroupIdQuery,
    private readonly createGroupTransactionCommand: CreateGroupTransactionCommand,
    private readonly updateGroupTransactionCommand: UpdateGroupTransactionCommand,
    private readonly deleteGroupTransactionCommand: DeleteGroupTransactionCommand
  ) {}

  initialize(): void {
    this.server.get(
      permissions.PRIVATE,
      '/groups/:groupId/transactions/:groupTransactionId',
      async (req, res) => {
        const memberId = req.userId
        const { groupTransactionId: id } = req.params
        const data = await this.GetGroupTransactionByIdQuery.execute({ id, memberId })
        res.status(httpStatusCode.OK).send({ data })
      }
    )

    this.server.get(permissions.PRIVATE, '/groups/:groupId/transactions', async (req, res) => {
      const memberId = req.userId
      const { groupId } = req.params
      const data = await this.GetGroupTransactionsByGroupIdQuery.execute({ groupId, memberId })
      res.status(httpStatusCode.OK).send({ data })
    })

    this.server.post<{
      body: Omit<CreateGroupTransactionDTO, 'groupId' | 'createdBy'>
    }>(permissions.PRIVATE, '/groups/:groupId/transactions', async (req, res) => {
      const createdBy = req.userId
      const { groupId } = req.params
      const data = req.body
      await this.createGroupTransactionCommand.execute({ ...data, groupId, createdBy })
      res.status(httpStatusCode.CREATED)
    })

    this.server.patch<{
      body: Omit<CreateGroupTransactionDTO, 'groupId' | 'createdBy'>
    }>(
      permissions.PRIVATE,
      '/groups/:groupId/transactions/:groupTransactionId',
      async (req, res) => {
        const { groupId, groupTransactionId: id } = req.params
        const data = req.body
        // TODO: maybe updatedBy?
        const memberId = req.userId
        await this.updateGroupTransactionCommand.execute({ ...data, id, groupId, memberId })
        res.status(httpStatusCode.NO_CONTENT)
      }
    )

    this.server.delete(
      permissions.PRIVATE,
      '/groups/:groupId/transactions/:groupTransactionId',
      async (req, res) => {
        const { groupTransactionId: id } = req.params
        await this.deleteGroupTransactionCommand.execute({ id })
        res.status(httpStatusCode.NO_CONTENT)
      }
    )
  }
}
