import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { CreateGroupMemberUseCase } from '../use-cases/create-group-member.use-case'
import type { DeleteGroupMemberUseCase } from '../use-cases/delete-group-member.use-case'

export class GroupMembersController {
  constructor(
    private readonly createGroupMemberUseCase: CreateGroupMemberUseCase,
    private readonly deleteGroupMemberUseCase: DeleteGroupMemberUseCase
  ) {}

  async createGroupMember(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    await this.createGroupMemberUseCase.execute({ groupId, userId })
    reply.status(httpStatusCode.CREATED).send()
  }

  async deleteGroupMember(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { groupId } = request.params
    await this.deleteGroupMemberUseCase.execute({ groupId, userId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
