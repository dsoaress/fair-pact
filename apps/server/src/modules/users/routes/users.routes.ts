import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '@/shared/middleares/auth.middleware'
import { makeControllersFactory } from '../factories/make-controllers.factories'

export function usersRoutes(app: FastifyInstance): void {
  const { usersController } = makeControllersFactory()
  const { getUserProfile } = usersController

  app.addHook('onRequest', authMiddleware)
  app.get('/profile', getUserProfile.bind(usersController))
}
