import type { GetUserProfileInputDto, GetUserProfileOutputDto } from 'contracts'

import type { Query } from '@/shared/base/query'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { UsersDao } from '../daos/users.dao'

export class GetUserProfileQuery
  implements Query<GetUserProfileInputDto, Promise<GetUserProfileOutputDto>>
{
  constructor(private readonly usersDao: UsersDao) {}

  async execute(data: GetUserProfileInputDto): Promise<GetUserProfileOutputDto> {
    const user = await this.usersDao.getUserById(data.id)
    if (!user) throw new NotFoundException('User')
    return user
  }
}
