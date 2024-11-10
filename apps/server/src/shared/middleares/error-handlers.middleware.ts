import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/shared/base/http-status-code'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { ConflictException } from '@/shared/exceptions/conflict.exception'
import { ForbiddenException } from '@/shared/exceptions/forbidden.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception'

function safeParseErrorMessage(error: FastifyError): Record<string, unknown> | string {
  try {
    return JSON.parse(error.message)
  } catch {
    return error.message
  }
}

export async function errorHandlerMiddleware(
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
        error: safeParseErrorMessage(error),
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
