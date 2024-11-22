import { type GetGroupsInputDTO, type GetGroupsOutputDTO, getGroupsInputValidator } from 'contracts'

import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'

import type { GroupsDAO } from '../daos/groups.dao'

export class GetGroupsQuery implements Query<GetGroupsInputDTO, Promise<GetGroupsOutputDTO>> {
  constructor(private readonly groupsDAO: GroupsDAO) {}

  async execute(data: GetGroupsInputDTO): Promise<GetGroupsOutputDTO> {
    const parsedData = getGroupsInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    return this.groupsDAO.getGroups(parsedData.data)
  }
}
