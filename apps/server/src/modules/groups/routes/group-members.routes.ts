import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GroupMembersController } from '../controllers/group-members.controller'

export class GroupMembersRoutes {
  constructor(private readonly groupMembersController: GroupMembersController) {}

  async createGroupMember(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    const { statusCode } = await this.groupMembersController.createGroupMember({ groupId, userId })
    reply.status(statusCode).send()
  }

  async deleteGroupMember(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    const { statusCode } = await this.groupMembersController.deleteGroupMember({ groupId, userId })
    reply.status(statusCode).send()
  }
}
