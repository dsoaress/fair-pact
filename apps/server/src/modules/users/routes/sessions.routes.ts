import type { FastifyInstance } from 'fastify'
import { makeControllersFactory } from '../factories/make-controllers.factories'

export function sessionsRoutes(app: FastifyInstance): void {
  const { sessionsController } = makeControllersFactory()
  const { createGoogleSession, refreshSession } = sessionsController

  app.get('/oauth/google', createGoogleSession.bind(sessionsController))
  app.post('/refresh', refreshSession.bind(sessionsController))
}
