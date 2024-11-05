import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GroupsController } from '../controllers/groups.controller'
import type { CreateGroupDto } from '../dtos/create-group.dto'
import type { UpdateGroupDto } from '../dtos/update-group.dto'

export class GroupsRoutes {
  constructor(private readonly groupsController: GroupsController) {}

  async getGroups(
    request: FastifyRequest<{ Headers: { 'user-id': string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { statusCode, data } = await this.groupsController.getGroups({ userId })
    reply.status(statusCode).send({ data })
  }

  async getGroupById(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.headers['user-id']
    const { id } = request.params
    const { statusCode, data } = await this.groupsController.getGroupById({ userId, id })
    reply.status(statusCode).send({ data })
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
    const { statusCode } = await this.groupsController.createGroup({
      ...data,
      createdBy: userId
    })
    reply.status(statusCode).send()
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
    const { statusCode } = await this.groupsController.updateGroup({
      ...data,
      id,
      updatedBy: userId
    })
    reply.status(statusCode).send()
  }

  async deleteGroup(
    request: FastifyRequest<{ Headers: { 'user-id': string }; Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params
    const { statusCode } = await this.groupsController.deleteGroup({ id })
    reply.status(statusCode).send()
  }
}
