import type { Controller } from '@/core/base/controller'
import { type HttpServer, httpStatusCode, permissions } from '@/core/base/http-server'
import type { CreateGroupTransactionCommand } from '@/modules/groups/commands/create-group-transaction.command'
import type { DeleteGroupTransactionCommand } from '@/modules/groups/commands/delete-group-transaction.command'
import type { UpdateGroupTransactionCommand } from '@/modules/groups/commands/update-group-transaction.command'
import type { CreateGroupTransactionDTO } from '@/modules/groups/dtos/create-group-transaction.dto'
import type { GetGroupTransactionsByGroupIdInputDTO } from '@/modules/groups/dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionByIdQuery } from '@/modules/groups/queries/get-group-transaction-by-id.query'
import type { GetGroupTransactionsByGroupIdQuery } from '@/modules/groups/queries/get-group-transactions-by-group-id.query'

const { PRIVATE } = permissions

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
      PRIVATE,
      '/groups/:groupId/transactions/:groupTransactionId',
      async (req, res) => {
        const memberId = req.userId
        const { groupTransactionId: id } = req.params
        const data = await this.GetGroupTransactionByIdQuery.execute({ id, memberId })
        res.status(httpStatusCode.OK).send({ data })
      }
    )

    this.server.get<{
      query: Omit<GetGroupTransactionsByGroupIdInputDTO, 'groupId' | 'memberId'>
    }>(PRIVATE, '/groups/:groupId/transactions', async (req, res) => {
      const memberId = req.userId
      const { groupId } = req.params
      const data = await this.GetGroupTransactionsByGroupIdQuery.execute({
        groupId,
        memberId,
        ...req.query
      })
      res.status(httpStatusCode.OK).send({ data })
    })

    this.server.post<{
      body: Omit<CreateGroupTransactionDTO, 'groupId' | 'createdBy'>
    }>(PRIVATE, '/groups/:groupId/transactions', async (req, res) => {
      const createdBy = req.userId
      const { groupId } = req.params
      const data = req.body
      await this.createGroupTransactionCommand.execute({ ...data, groupId, createdBy })
      res.status(httpStatusCode.CREATED)
    })

    this.server.patch<{
      body: Omit<CreateGroupTransactionDTO, 'groupId' | 'createdBy'>
    }>(PRIVATE, '/groups/:groupId/transactions/:groupTransactionId', async (req, res) => {
      const { groupId, groupTransactionId: id } = req.params
      const data = req.body
      // TODO: maybe updatedBy?
      const memberId = req.userId
      await this.updateGroupTransactionCommand.execute({ ...data, id, groupId, memberId })
      res.status(httpStatusCode.NO_CONTENT)
    })

    this.server.delete(
      PRIVATE,
      '/groups/:groupId/transactions/:groupTransactionId',
      async (req, res) => {
        const { groupTransactionId: id } = req.params
        await this.deleteGroupTransactionCommand.execute({ id })
        res.status(httpStatusCode.NO_CONTENT)
      }
    )
  }
}
