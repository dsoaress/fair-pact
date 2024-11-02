import type { FastifyReply, FastifyRequest } from 'fastify'

import type { CreateGroupDto } from '../dtos/create-group.dto'
import type { CreateGroupUseCase } from '../use-cases/create-group.use-case'

export class GroupsController {
  constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}

  async createGroup(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = request.body as CreateGroupDto
    this.createGroupUseCase.execute({ createdBy: '', data })
    reply.status(201).send()
  }
}
