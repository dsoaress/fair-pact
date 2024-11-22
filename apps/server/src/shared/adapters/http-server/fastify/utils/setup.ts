import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

import { env } from '@/shared/config/env'

import type { FastifyInstance } from 'fastify'
import { errorHandler } from './error-handler.middleware'
import { healthCheckHandler } from './health-checker.handler'

export function setup(app: FastifyInstance): void {
  app.register(fastifyCors)
  app.register(fastifyJwt, { secret: env.JWT_SECRET, sign: { expiresIn: '15m' } })
  app.get('/health-check', healthCheckHandler)
  app.setErrorHandler(errorHandler)
}
