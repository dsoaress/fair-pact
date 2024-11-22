import { fastify } from 'fastify'

import { makeGroupsControllersFactory } from '@/modules/groups/factories/make-controllers.factories'
import { makeUsersControllersFactory } from '@/modules/users/factories/make-controllers.factories'

import { FastifyHttpServerAdapter } from './adapters/http-server/fastify/fastify-http-server.adapter'
import { env } from './config/env'
import { logger } from './config/logger'

export async function app(): Promise<void> {
  const server = new FastifyHttpServerAdapter(fastify({ logger }))

  const { groupsController, groupTransactionsController } = makeGroupsControllersFactory({ server })
  const { sessionsController, usersController } = makeUsersControllersFactory({ server })

  groupsController.initialize()
  groupTransactionsController.initialize()
  sessionsController.initialize()
  usersController.initialize()

  await server.listen(env.PORT)
}
