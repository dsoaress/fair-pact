import type { CreateGroupDto } from '@fair-pact/contracts/groups/dtos/create-group.dto'
import type { UpdateGroupDto } from '@fair-pact/contracts/groups/dtos/update-group.dto'
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
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId: id } = request.params
    const data = await this.getGroupByIdQuery.execute({ userId, id })
    reply.status(httpStatusCode.OK).send({ data })
  }

  async getGroups(
    request: FastifyRequest<{ Headers: { 'user-id': string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const data = await this.getGroupsQuery.execute({ userId })
    reply.status(httpStatusCode.OK).send({ data })
  }

  async createGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Pick<CreateGroupDto, 'name' | 'currency'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const createdBy = request.headers['user-id']
    const data = request.body
    await this.createGroupCommand.execute({ ...data, createdBy })
    reply.status(httpStatusCode.CREATED).send()
  }

  async joinGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const groupId = request.params.groupId
    await this.joinGroupCommand.execute({ id: groupId, userId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async leaveGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const groupId = request.params.groupId
    await this.removeGroupMemberCommand.execute({ id: groupId, userId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async removeGroupMember(
    request: FastifyRequest<{
      Params: { groupId: string }
      Body: { userId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { userId } = request.body
    const groupId = request.params.groupId
    await this.removeGroupMemberCommand.execute({ id: groupId, userId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async updateGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Pick<UpdateGroupDto, 'name' | 'currency'>
      Params: { groupId: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const updatedBy = request.headers['user-id']
    const data = request.body
    const id = request.params.groupId
    await this.updateGroupCommand.execute({ ...data, id, updatedBy })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroup(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.groupId
    await this.deleteGroupCommand.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
