import { fastify } from 'fastify'
import { env } from './config/env'
import { groupRoutes } from './routes/groups.routes'

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

groupRoutes(app)

export { app }
