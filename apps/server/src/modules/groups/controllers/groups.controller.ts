import type { CreateGroupDto } from '@fair-pact/contracts/groups/dtos/create-group.dto'
import type { UpdateGroupDto } from '@fair-pact/contracts/groups/dtos/update-group.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { GetGroupByIdQuery } from '../queries/get-group-by-id.query'
import type { GetGroupsQuery } from '../queries/get-groups.query'
import type { CreateGroupUseCase } from '../use-cases/create-group.use-case'
import type { DeleteGroupUseCase } from '../use-cases/delete-group.use-case'
import type { UpdateGroupUseCase } from '../use-cases/update-group.use-case'

export class GroupsController {
  constructor(
    private readonly getGroupByIdQuery: GetGroupByIdQuery,
    private readonly getGroupsQuery: GetGroupsQuery,
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase
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
    await this.createGroupUseCase.execute({ ...data, createdBy })
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
    // TODO: Implement
    console.log('Join group', userId, groupId)
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async leaveGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Params: { groupId: string }
    }>
  ): Promise<void> {
    const userId = request.headers['user-id']
    const groupId = request.params.groupId
    // TODO: Implement
    console.log('Leave group', userId, groupId)
  }

  async removeGroupMember(
    request: FastifyRequest<{
      Params: { groupId: string }
      Body: { userId: string }
    }>
  ): Promise<void> {
    const { userId } = request.body
    const groupId = request.params.groupId
    // TODO: Implement
    console.log('Remove group member', userId, groupId)
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
    await this.updateGroupUseCase.execute({ ...data, id, updatedBy })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroup(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { groupId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = request.params.groupId
    await this.deleteGroupUseCase.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
