import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'
import { env } from '@/shared/config/env'

import type { CreateOrUpdateUserCommand } from '../commands/create-or-update-user.command'
import type { CreateSessionCommand } from '../commands/create-session.command'
import type { RefreshSessionCommand } from '../commands/refresh-session.command'
import type { GoogleOAuthService } from '../services/google-oauth.service'

export class SessionsController {
  constructor(
    private readonly createOrUpdateUserCommand: CreateOrUpdateUserCommand,
    private readonly createSessionCommand: CreateSessionCommand,
    private readonly refreshSessionCommand: RefreshSessionCommand,
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
      const { id: sessionId } = await this.createSessionCommand.execute(id)
      reply
        .status(httpStatusCode.REDIRECT)
        .redirect(`${env.CLIENT_URL}/sign-in?token=${token}&refresh-token=${sessionId}`)
    } catch (error) {
      request.log.error(error)
      reply.status(httpStatusCode.REDIRECT).redirect(`${env.CLIENT_URL}/sign-in?error=google`)
    }
  }

  async refreshSession(
    request: FastifyRequest<{ Body: { refreshToken: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { refreshToken } = request.body
    const { sessionId, userId } = await this.refreshSessionCommand.execute(refreshToken)
    const token = await reply.jwtSign({}, { sign: { sub: userId } })
    reply.status(httpStatusCode.OK).send({ token, refreshToken: sessionId })
  }
}
