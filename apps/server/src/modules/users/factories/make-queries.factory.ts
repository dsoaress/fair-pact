import type { UsersDAO } from '../daos/users.dao'
import { GetUserProfileQuery } from '../queries/get-user-profile.query'

type Input = {
  usersDAO: UsersDAO
}

type Output = {
  getUserProfileQuery: GetUserProfileQuery
}

export function makeQueriesFactory({ usersDAO }: Input): Output {
  const getUserProfileQuery = new GetUserProfileQuery(usersDAO)

  return {
    getUserProfileQuery
  }
}
