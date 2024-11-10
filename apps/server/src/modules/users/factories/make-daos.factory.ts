import { drizzleService } from '@/shared/database/drizzle/drizzle.service'

import { UsersDao } from '../daos/users.dao'

type Output = {
  usersDao: UsersDao
}

export function makeDaosFactory(): Output {
  const usersDao = new UsersDao(drizzleService)

  return {
    usersDao
  }
}
