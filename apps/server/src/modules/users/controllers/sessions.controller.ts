import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'
import { env } from '@/shared/config/env'

import type { CreateOrUpdateUserCommand } from '../commands/create-or-update-user.command'
import type { GoogleOAuthService } from '../services/google-oauth.service'

export class SessionsController {
  constructor(
    private readonly createOrUpdateUserCommand: CreateOrUpdateUserCommand,
    private readonly googleOAuthService: GoogleOAuthService
  ) {}

  async createGoogleSession(
    request: FastifyRequest<{ Querystring: { code: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { code } = request.query
      const userInfo = await this.googleOAuthService.execute(code)
      const { id } = await this.createOrUpdateUserCommand.execute(userInfo)
      const token = await reply.jwtSign({}, { sign: { sub: id } })
      reply.status(httpStatusCode.REDIRECT).redirect(`${env.CLIENT_URL}/login?token=${token}`)
    } catch (error) {
      request.log.error(error)
      reply.status(httpStatusCode.REDIRECT).redirect(`${env.CLIENT_URL}/login?error=google`)
    }
  }
}
