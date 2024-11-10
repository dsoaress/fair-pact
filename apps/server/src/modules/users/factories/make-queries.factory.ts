import type { UsersDao } from '../daos/users.dao'
import { GetUserProfileQuery } from '../queries/get-user-profile.query'

type Input = {
  usersDao: UsersDao
}

type Output = {
  getUserProfileQuery: GetUserProfileQuery
}

export function makeQueriesFactory({ usersDao }: Input): Output {
  const getUserProfileQuery = new GetUserProfileQuery(usersDao)

  return {
    getUserProfileQuery
  }
}
