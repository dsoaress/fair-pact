import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { type FastifyInstance, fastify } from 'fastify'

import { groupsRoutes } from '../modules/groups/groups.routes'
import { env } from './config/env'
import { logger } from './config/logger'
import { authMiddleware } from './middleares/auth.middleware'
import { errorHandlerMiddleware } from './middleares/error-handlers.middleware'

export function app(): FastifyInstance {
  const fastifyInstance = fastify({ logger })

  fastifyInstance.register(cors)
  fastifyInstance.register(jwt, { secret: env.JWT_SECRET })

  // Public routes

  // Private routes
  fastifyInstance.addHook('onRequest', authMiddleware)
  fastifyInstance.register(groupsRoutes, { prefix: '/groups' })

  fastifyInstance.setErrorHandler(errorHandlerMiddleware)

  return fastifyInstance
}
