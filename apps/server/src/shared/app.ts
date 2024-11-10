import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { fastify } from 'fastify'

import { groupsRoutes } from '@/modules/groups/routes/groups.routes'
import { sessionsRoutes } from '@/modules/users/routes/sessions.routes'
import { usersRoutes } from '@/modules/users/routes/users.routes'

import { env } from './config/env'
import { logger } from './config/logger'
import { errorHandlerMiddleware } from './middleares/error-handlers.middleware'

const app = fastify({ logger })

app.register(jwt, { secret: env.JWT_SECRET, sign: { expiresIn: '30d' } })
app.register(cors)

app.register(groupsRoutes, { prefix: '/groups' })
app.register(sessionsRoutes, { prefix: '/sessions' })
app.register(usersRoutes, { prefix: '/users' })

app.setErrorHandler(errorHandlerMiddleware)

export { app }
