import type { HttpServer } from '@/shared/base/http-server'

import { CreateOrUpdateUserCommand } from './commands/create-or-update-user.command'
import { CreateSessionCommand } from './commands/create-session.command'
import { RefreshSessionCommand } from './commands/refresh-session.command'
import { SessionsController } from './controllers/sessions.controller'
import { UsersControllers } from './controllers/users.controller'
import type { UsersDAO } from './daos/users.dao'
import { GetUserProfileQuery } from './queries/get-user-profile.query'
import type { SessionsRepository } from './repositories/sessions.repository'
import type { UsersRepository } from './repositories/users.repository'
import { GoogleOAuthService } from './services/google-oauth.service'

type Input = {
  server: HttpServer
  usersDAO: UsersDAO
  usersRepository: UsersRepository
  sessionsRepository: SessionsRepository
}

export function usersModule({
  server,
  usersDAO,
  usersRepository,
  sessionsRepository
}: Input): void {
  const getUserProfileQuery = new GetUserProfileQuery(usersDAO)
  const createOrUpdateUserCommand = new CreateOrUpdateUserCommand(usersRepository)
  const createSessionCommand = new CreateSessionCommand(sessionsRepository)
  const refreshSessionCommand = new RefreshSessionCommand(sessionsRepository)
  const googleOAuthService = new GoogleOAuthService()
  const sessionsController = new SessionsController(
    server,
    createOrUpdateUserCommand,
    createSessionCommand,
    refreshSessionCommand,
    googleOAuthService
  )
  const usersController = new UsersControllers(server, getUserProfileQuery)

  sessionsController.initialize()
  usersController.initialize()
}
