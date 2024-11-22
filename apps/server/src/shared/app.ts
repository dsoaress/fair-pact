import { fastify } from 'fastify'

import { FastifyHttpServerAdapter } from './adapters/http-server/fastify/fastify-http-server.adapter'
import { appModule } from './app.module'
import { env } from './config/env'
import { logger } from './config/logger'

export async function app(): Promise<void> {
  const server = new FastifyHttpServerAdapter(fastify({ logger }))
  appModule({ server })
  await server.listen(env.PORT)
}
