import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/core/base/http-server'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { ConflictException } from '@/core/exceptions/conflict.exception'
import { ForbiddenException } from '@/core/exceptions/forbidden.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'
import { UnauthorizedException } from '@/core/exceptions/unauthorized.exception'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { url, log } = request
  const baseError = { url, date: new Date() }

  switch (true) {
    case error instanceof BadRequestException:
      return reply.code(httpStatusCode.BAD_REQUEST).send({
        statusCode: httpStatusCode.BAD_REQUEST,
        error: error.message,
        ...baseError
      })
    case error instanceof ConflictException:
      return reply
        .code(httpStatusCode.CONFLICT)
        .send({ statusCode: httpStatusCode.CONFLICT, error: error.message, ...baseError })
    case error instanceof UnauthorizedException:
      return reply.code(httpStatusCode.UNAUTHORIZED).send({
        statusCode: httpStatusCode.UNAUTHORIZED,
        error: error.message,
        ...baseError
      })
    case error instanceof ForbiddenException:
      return reply.code(httpStatusCode.FORBIDDEN).send({
        statusCode: httpStatusCode.FORBIDDEN,
        error: error.message,
        ...baseError
      })
    case error instanceof NotFoundException:
      return reply.code(httpStatusCode.NOT_FOUND).send({
        statusCode: httpStatusCode.NOT_FOUND,
        error: error.message,
        ...baseError
      })
    default:
      log.error(error)
      return reply.code(httpStatusCode.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
        ...baseError
      })
  }
}
