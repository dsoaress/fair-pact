import { CreateOrUpdateUserCommand } from '../commands/create-or-update-user.command'
import type { UsersRepository } from '../repositories/users.repository'

type Input = {
  usersRepository: UsersRepository
}

type Output = {
  createOrUpdateUserCommand: CreateOrUpdateUserCommand
}

export function makeCommandsFactory({ usersRepository }: Input): Output {
  const createOrUpdateUserCommand = new CreateOrUpdateUserCommand(usersRepository)

  return {
    createOrUpdateUserCommand
  }
}
