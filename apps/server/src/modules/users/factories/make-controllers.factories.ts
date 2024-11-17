import { SessionsController } from '../controllers/sessions.controller'
import { UsersControllers } from '../controllers/users.controller'
import { GoogleOAuthService } from '../services/google-oauth.service'
import { makeCommandsFactory } from './make-commands.factory'
import { makeDAOsFactory } from './make-daos.factory'
import { makeQueriesFactory } from './make-queries.factory'
import { makeRepositoriesFactory } from './make-repositories.factory'

type Output = {
  sessionsController: SessionsController
  usersController: UsersControllers
}

export function makeControllersFactory(): Output {
  const { usersRepository, sessionsRepository } = makeRepositoriesFactory()
  const { usersDAO } = makeDAOsFactory()

  const { createOrUpdateUserCommand, createSessionCommand, refreshSessionCommand } =
    makeCommandsFactory({
      usersRepository,
      sessionsRepository
    })
  const { getUserProfileQuery } = makeQueriesFactory({ usersDAO })

  const googleOAuthService = new GoogleOAuthService()

  const sessionsController = new SessionsController(
    createOrUpdateUserCommand,
    createSessionCommand,
    refreshSessionCommand,
    googleOAuthService
  )
  const usersController = new UsersControllers(getUserProfileQuery)

  return {
    sessionsController,
    usersController
  }
}
