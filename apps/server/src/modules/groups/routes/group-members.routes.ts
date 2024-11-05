import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GroupMembersController } from '../controllers/group-members.controller'
import type { CreateGroupMemberDto } from '../dtos/create-group-member.dto'

export class GroupMembersRoutes {
  constructor(private readonly groupMembersController: GroupMembersController) {}

  async createGroupMember(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Pick<CreateGroupMemberDto, 'groupId'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { groupId } = request.body
    const userId = request.headers['user-id']
    const { statusCode } = await this.groupMembersController.createGroupMember({ groupId, userId })
    reply.status(statusCode).send()
  }

  async deleteGroupMember(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params
    const { statusCode } = await this.groupMembersController.deleteGroupMember(id)
    reply.status(statusCode).send()
  }
}
