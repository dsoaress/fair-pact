import { SessionsController } from '../controllers/sessions.controller'
import { UsersControllers } from '../controllers/users.controller'
import { GoogleOAuthService } from '../services/google-oauth.service'
import { makeCommandsFactory } from './make-commands.factory'
import { makeDaosFactory } from './make-daos.factory'
import { makeQueriesFactory } from './make-queries.factory'
import { makeRepositoriesFactory } from './make-repositories.factory'

type Output = {
  sessionsController: SessionsController
  usersController: UsersControllers
}

export function makeControllersFactory(): Output {
  const { usersRepository } = makeRepositoriesFactory()
  const { usersDao } = makeDaosFactory()

  const { createOrUpdateUserCommand } = makeCommandsFactory({ usersRepository })
  const { getUserProfileQuery } = makeQueriesFactory({ usersDao })

  const googleOAuthService = new GoogleOAuthService()

  const sessionsController = new SessionsController(createOrUpdateUserCommand, googleOAuthService)
  const usersController = new UsersControllers(getUserProfileQuery)

  return {
    sessionsController,
    usersController
  }
}
