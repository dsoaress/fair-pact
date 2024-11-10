import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { UsersRepository } from '../repositories/users.repository'

type Output = {
  usersRepository: UsersRepository
}

export function makeRepositoriesFactory(): Output {
  const usersRepository = new UsersRepository(drizzleService)

  return {
    usersRepository
  }
}
