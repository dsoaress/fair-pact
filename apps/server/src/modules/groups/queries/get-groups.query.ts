import type { Query } from '@/core/base/query'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'

import type { GroupsDAO } from '../daos/groups.dao'
import type { GetGroupsInputDTO } from '../dtos/get-groups-input.dto'
import type { GetGroupsOutputDTO } from '../dtos/get-groups-output.dto'
import { getGroupsInputValidator } from '../validators/get-groups-input.validator'

export class GetGroupsQuery implements Query<GetGroupsInputDTO, Promise<GetGroupsOutputDTO>> {
  constructor(private readonly groupsDAO: GroupsDAO) {}

  async execute(data: GetGroupsInputDTO): Promise<GetGroupsOutputDTO> {
    const parsedData = getGroupsInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    return this.groupsDAO.getGroups(parsedData.data)
  }
}
