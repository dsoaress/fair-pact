import type { Query } from '@/core/base/query'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import type { UsersDAO } from '../daos/users.dao'
import type { GetUserProfileInputDTO } from '../dtos/get-user-profile-input.dto'
import type { GetUserProfileOutputDTO } from '../dtos/get-user-profile-output.dto'

export class GetUserProfileQuery
  implements Query<GetUserProfileInputDTO, Promise<GetUserProfileOutputDTO>>
{
  constructor(private readonly usersDAO: UsersDAO) {}

  async execute(data: GetUserProfileInputDTO): Promise<GetUserProfileOutputDTO> {
    const user = await this.usersDAO.getUserById(data.id)
    if (!user) throw new NotFoundException('User')
    return user
  }
}
