import { groupsModule } from '@/modules/groups/groups.module'
import { usersModule } from '@/modules/users/users.module'
import fastify from 'fastify'
import { RedisCacheServiceAdapter } from './adapters/cache-service/redis/redis-cache-service.adapter'
import { FastifyHttpServerAdapter } from './adapters/http-server/fastify/fastify-http-server.adapter'
import { env } from './config/env'
import { logger } from './config/logger'
import { databaseModule } from './database/database.module'

export async function appModule(): Promise<void> {
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

  groupsModule({
    groupTransactionsDAO,
    groupTransactionsRepository,
    groupsDAO,
    groupsRepository,
    server
  })

  usersModule({
    server,
    sessionsRepository,
    usersDAO,
    usersRepository
  })

  await server.listen(env.PORT)
}
