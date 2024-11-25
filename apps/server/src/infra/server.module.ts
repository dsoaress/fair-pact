import fastify from 'fastify'

import type { HttpServer } from '@/core/base/http-server'

import { RedisCacheServiceAdapter } from './adapters/cache-service/redis/redis-cache-service.adapter'
import { FastifyHttpServerAdapter } from './adapters/http-server/fastify/fastify-http-server.adapter'
import { logger } from './config/logger'
import { databaseModule } from './database/database.module'
import { httpModule } from './http/http.module'

export function serverModule(): HttpServer {
  const server = new FastifyHttpServerAdapter(fastify({ logger }))
  const cacheService = new RedisCacheServiceAdapter()

  const {
    groupTransactionsDAO,
    groupTransactionsRepository,
    groupsDAO,
    groupsRepository,
    sessionsRepository,
    usersDAO,
    usersRepository
  } = databaseModule({ cacheService })

  httpModule({
    server,
    groupTransactionsDAO,
    groupTransactionsRepository,
    groupsDAO,
    groupsRepository,
    sessionsRepository,
    usersDAO,
    usersRepository
  })

  return server
}
