import { type GetGroupsInputDto, type GetGroupsOutputDto, getGroupsInputValidator } from 'contracts'

import type { Query } from '@/shared/base/query'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import type { GroupsDao } from '../daos/groups.dao'

export class GetGroupsQuery implements Query<GetGroupsInputDto, Promise<GetGroupsOutputDto>> {
  constructor(private readonly groupsDao: GroupsDao) {}

  async execute(data: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    const parsedData = getGroupsInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    return this.groupsDao.getGroups(parsedData.data)
  }
}
