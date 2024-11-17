import { CreateOrUpdateUserCommand } from '../commands/create-or-update-user.command'
import { CreateSessionCommand } from '../commands/create-session.command'
import { RefreshSessionCommand } from '../commands/refresh-session.command'
import type { SessionsRepository } from '../repositories/sessions.repository'
import type { UsersRepository } from '../repositories/users.repository'

type Input = {
  usersRepository: UsersRepository
  sessionsRepository: SessionsRepository
}

type Output = {
  createOrUpdateUserCommand: CreateOrUpdateUserCommand
  createSessionCommand: CreateSessionCommand
  refreshSessionCommand: RefreshSessionCommand
}

export function makeCommandsFactory({ usersRepository, sessionsRepository }: Input): Output {
  const createOrUpdateUserCommand = new CreateOrUpdateUserCommand(usersRepository)
  const createSessionCommand = new CreateSessionCommand(sessionsRepository)
  const refreshSessionCommand = new RefreshSessionCommand(sessionsRepository)

  return {
    createOrUpdateUserCommand,
    createSessionCommand,
    refreshSessionCommand
  }
}
