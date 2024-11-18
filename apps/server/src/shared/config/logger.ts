import { env } from './env'

export const logger =
  {
    local: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    },
    staging: true,
    production: true,
    test: false,
    ci: false
  }[env.NODE_ENV] ?? true
