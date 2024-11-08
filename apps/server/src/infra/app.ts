import cors from '@fastify/cors'
import { fastify } from 'fastify'

import { groupsRoutes } from '../modules/groups/groups.routes'
import { env } from './config/env'
import { errorHandlerMiddleware } from './middleares/error-handlers.middleware'

const envToLogger = {
  local: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  },
  development: true,
  production: true,
  test: false
}

const app = fastify({
  logger: envToLogger[env.NODE_ENV] ?? true
})

app.register(cors)
app.register(groupsRoutes, { prefix: '/groups' })

app.setErrorHandler(errorHandlerMiddleware)

export { app }
