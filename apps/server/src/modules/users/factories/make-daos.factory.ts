import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { UsersDAO } from '../daos/users.dao'

type Output = {
  usersDAO: UsersDAO
}

export function makeDAOsFactory(): Output {
  const usersDAO = new UsersDAO(drizzleService)

  return {
    usersDAO
  }
}
