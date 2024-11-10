import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { fastify } from 'fastify'

import { groupsRoutes } from '../modules/groups/groups.routes'
import { env } from './config/env'
import { logger } from './config/logger'
import { authMiddleware } from './middleares/auth.middleware'
import { errorHandlerMiddleware } from './middleares/error-handlers.middleware'

const app = fastify({ logger })

app.register(cors)
app.register(jwt, { secret: env.JWT_SECRET })

// Public routes

// Private routes
app.addHook('onRequest', authMiddleware)
app.register(groupsRoutes, { prefix: '/groups' })

app.setErrorHandler(errorHandlerMiddleware)

export { app }
