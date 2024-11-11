import type { GetUserProfileInputDTO, GetUserProfileOutputDTO } from 'contracts'

import type { Query } from '@/shared/base/query'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { UsersDAO } from '../daos/users.dao'

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
