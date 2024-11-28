import fastifyJwt from '@fastify/jwt'

import { env } from '@/infra/config/env'

import type { FastifyInstance } from 'fastify'
import { errorHandler } from './error-handler.middleware'
import { healthCheckHandler } from './health-checker.handler'

export function setup(server: FastifyInstance): void {
  server.register(fastifyJwt, { secret: env.JWT_SECRET, sign: { expiresIn: '15m' } })
  server.get('/health-check', healthCheckHandler)
  server.setErrorHandler(errorHandler)
}
