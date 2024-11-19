import type { CreateGroupInputDTO, UpdateGroupDTO } from 'contracts'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { CreateGroupCommand } from '../commands/create-group.command'
import type { DeleteGroupCommand } from '../commands/delete-group.command'
import type { JoinGroupCommand } from '../commands/join-group.command'
import type { RemoveGroupMemberCommand } from '../commands/remove-group-member.command'
import type { UpdateGroupCommand } from '../commands/update-group.command'
import type { GetGroupByIdQuery } from '../queries/get-group-by-id.query'
import type { GetGroupsQuery } from '../queries/get-groups.query'

export class GroupsController {
  constructor(
    private readonly getGroupByIdQuery: GetGroupByIdQuery,
    private readonly getGroupsQuery: GetGroupsQuery,
    private readonly createGroupCommand: CreateGroupCommand,
    private readonly joinGroupCommand: JoinGroupCommand,
    private readonly removeGroupMemberCommand: RemoveGroupMemberCommand,
    private readonly updateGroupCommand: UpdateGroupCommand,
    private readonly deleteGroupCommand: DeleteGroupCommand
  ) {}

  async getGroupById(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const { groupId: id } = request.params
    const data = await this.getGroupByIdQuery.execute({ memberId, id })
    reply.status(httpStatusCode.OK).send({ data })
  }

  async getGroups(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const memberId = request.user.sub
    const data = await this.getGroupsQuery.execute({ memberId })
    reply.status(httpStatusCode.OK).send({ data })
  }

  async createGroup(
    request: FastifyRequest<{
      Body: Pick<CreateGroupInputDTO, 'name' | 'currency'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const createdBy = request.user.sub
    const data = request.body
    const result = await this.createGroupCommand.execute({ ...data, createdBy })
    reply.status(httpStatusCode.CREATED).send(result)
  }

  async joinGroup(
    request: FastifyRequest<{
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const groupId = request.params.groupId
    await this.joinGroupCommand.execute({ id: groupId, memberId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async leaveGroup(
    request: FastifyRequest<{
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const memberId = request.user.sub
    const groupId = request.params.groupId
    await this.removeGroupMemberCommand.execute({ id: groupId, memberId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async removeGroupMember(
    request: FastifyRequest<{
      Params: { groupId: string }
      Body: { memberId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { memberId } = request.body
    const groupId = request.params.groupId
    await this.removeGroupMemberCommand.execute({ id: groupId, memberId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async updateGroup(
    request: FastifyRequest<{
      Body: Pick<UpdateGroupDTO, 'name' | 'currency'>
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const updatedBy = request.user.sub
    const data = request.body
    const id = request.params.groupId
    await this.updateGroupCommand.execute({ ...data, id, updatedBy })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroup(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.groupId
    await this.deleteGroupCommand.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
