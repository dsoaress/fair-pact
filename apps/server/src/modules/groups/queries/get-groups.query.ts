import type { GetGroupsInputDto } from '@fair-pact/contracts/groups/dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import { getGroupsInputValidator } from '@fair-pact/contracts/groups/validators/get-groups-input.validator'

import type { Query } from '@/shared/base/query'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import type { GroupsDao } from '../daos/groups.dao'

export class GetGroupsQuery implements Query<GetGroupsInputDto, Promise<GetGroupsOutputDto>> {
  constructor(private readonly groupsDao: GroupsDao) {}

  async execute(data: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    console.log('data', data)
    const parsedData = getGroupsInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    return this.groupsDao.getGroups(parsedData.data)
  }
}
