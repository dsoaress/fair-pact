import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'

import type { GetUserProfileQuery } from '../queries/get-user-profile.query'

export class UsersControllers {
  constructor(private readonly getUserProfileQuery: GetUserProfileQuery) {}

  async getUserProfile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const id = request.user.sub
    const data = await this.getUserProfileQuery.execute({ id })
    reply.status(httpStatusCode.OK).send({ data })
  }
}
