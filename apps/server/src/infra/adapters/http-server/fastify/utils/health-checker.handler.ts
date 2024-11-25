import type { FastifyReply, FastifyRequest } from 'fastify'

import { httpStatusCode } from '@/core/base/http-server'

export async function healthCheckHandler(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply.code(httpStatusCode.OK).send({ message: 'Server is running' })
}
