import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { SessionsRepository } from '../repositories/sessions.repository'
import { UsersRepository } from '../repositories/users.repository'

type Output = {
  usersRepository: UsersRepository
  sessionsRepository: SessionsRepository
}

export function makeRepositoriesFactory(): Output {
  const usersRepository = new UsersRepository(drizzleService)
  const sessionsRepository = new SessionsRepository(drizzleService)

  return {
    usersRepository,
    sessionsRepository
  }
}
