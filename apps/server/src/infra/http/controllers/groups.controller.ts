import type { Controller } from '@/core/base/controller'
import { type HttpServer, httpStatusCode, permissions } from '@/core/base/http-server'
import type { CreateGroupCommand } from '@/modules/groups/commands/create-group.command'
import type { DeleteGroupCommand } from '@/modules/groups/commands/delete-group.command'
import type { JoinGroupCommand } from '@/modules/groups/commands/join-group.command'
import type { RemoveGroupMemberCommand } from '@/modules/groups/commands/remove-group-member.command'
import type { UpdateGroupCommand } from '@/modules/groups/commands/update-group.command'
import type { CreateGroupInputDTO } from '@/modules/groups/dtos/create-group-input.dto'
import type { UpdateGroupDTO } from '@/modules/groups/dtos/update-group.dto'
import type { GetGroupByIdQuery } from '@/modules/groups/queries/get-group-by-id.query'
import type { GetGroupsQuery } from '@/modules/groups/queries/get-groups.query'

const { PRIVATE } = permissions

export class GroupsController implements Controller {
  constructor(
    private readonly server: HttpServer,
    private readonly getGroupByIdQuery: GetGroupByIdQuery,
    private readonly getGroupsQuery: GetGroupsQuery,
    private readonly createGroupCommand: CreateGroupCommand,
    private readonly joinGroupCommand: JoinGroupCommand,
    private readonly removeGroupMemberCommand: RemoveGroupMemberCommand,
    private readonly updateGroupCommand: UpdateGroupCommand,
    private readonly deleteGroupCommand: DeleteGroupCommand
  ) {}

  initialize(): void {
    this.server.get(PRIVATE, '/groups/:groupId', async (req, res) => {
      const memberId = req.userId
      const { groupId: id } = req.params
      const data = await this.getGroupByIdQuery.execute({ memberId, id })
      res.status(httpStatusCode.OK).send({ data })
    })

    this.server.get(PRIVATE, '/groups', async (req, res) => {
      const memberId = req.userId
      const data = await this.getGroupsQuery.execute({ memberId })
      res.status(httpStatusCode.OK).send({ data })
    })

    this.server.post<{
      body: Pick<CreateGroupInputDTO, 'name' | 'currency'>
    }>(PRIVATE, '/groups', async (req, res) => {
      const createdBy = req.userId
      const data = await this.createGroupCommand.execute({ ...req.body, createdBy })
      res.status(httpStatusCode.CREATED).send({ data })
    })

    this.server.post(PRIVATE, '/groups/:groupId/join', async (req, res) => {
      const memberId = req.userId
      const { groupId: id } = req.params
      await this.joinGroupCommand.execute({ id, memberId })
      res.status(httpStatusCode.NO_CONTENT)
    })

    this.server.post(PRIVATE, '/groups/:groupId/leave', async (req, res) => {
      const memberId = req.userId
      const { groupId: id } = req.params
      await this.removeGroupMemberCommand.execute({ id, memberId })
      res.status(httpStatusCode.NO_CONTENT)
    })

    this.server.post<{
      body: { memberId: string }
    }>(PRIVATE, '/groups/:groupId/members', async (req, res) => {
      const { memberId } = req.body
      const { groupId: id } = req.params
      await this.removeGroupMemberCommand.execute({ id, memberId })
      res.status(httpStatusCode.NO_CONTENT)
    })

    this.server.patch<{
      body: Pick<UpdateGroupDTO, 'name' | 'currency'>
    }>(PRIVATE, '/groups/:groupId', async (req, res) => {
      const updatedBy = req.userId
      const data = req.body
      const { groupId: id } = req.params
      await this.updateGroupCommand.execute({ ...data, id, updatedBy })
      res.status(httpStatusCode.NO_CONTENT)
    })

    this.server.delete(PRIVATE, '/groups/:groupId', async (req, res) => {
      const id = req.params.groupId
      await this.deleteGroupCommand.execute({ id })
      res.status(httpStatusCode.NO_CONTENT)
    })
  }
}
