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
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { id } = request.params
    const group = await this.getGroupByIdQuery.execute({ userId, id })
    reply.status(httpStatusCode.OK).send({ data: group })
  }

  async getGroups(
    request: FastifyRequest<{ Headers: { 'user-id': string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const groups = await this.getGroupsQuery.execute({ userId })
    reply.status(httpStatusCode.OK).send({ data: groups })
  }

  async createGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Pick<CreateGroupDto, 'name' | 'currency'>
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const data = request.body
    await this.createGroupUseCase.execute({ ...data, createdBy: userId })
    reply.status(httpStatusCode.CREATED).send()
  }

  async updateGroup(
    request: FastifyRequest<{
      Headers: { 'user-id': string }
      Body: Pick<UpdateGroupDto, 'name' | 'currency'>
      Params: { id: string }
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const data = request.body
    const { id } = request.params
    await this.updateGroupUseCase.execute({ ...data, id, updatedBy: userId })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }

  async deleteGroup(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params
    await this.deleteGroupUseCase.execute({ id })
    reply.status(httpStatusCode.NO_CONTENT).send()
  }
}
