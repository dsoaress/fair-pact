import type { Query } from '@/shared/base/query'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import type { GroupsDao } from '../daos/groups.dao'
import type { GetGroupsInputDto } from '../dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '../dtos/get-groups-output.dto'
import { getGroupsInputValidator } from '../validators/get-groups-input.validator'

export class GetGroupsQuery implements Query<GetGroupsInputDto, Promise<GetGroupsOutputDto>> {
  constructor(private readonly groupsDao: GroupsDao) {}

  async execute(data: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    const parsedData = getGroupsInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    return this.groupsDao.getGroups(parsedData.data)
  }
}
