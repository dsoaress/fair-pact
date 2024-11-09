import type { GetGroupByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import { getGroupByIdInputValidator } from '@fair-pact/contracts/groups/validators/get-group-by-id-input.validator'

import type { Query } from '@/shared/base/query'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsDao } from '../daos/groups.dao'

export class GetGroupByIdQuery
  implements Query<GetGroupByIdInputDto, Promise<GetGroupByIdOutputDto>>
{
  constructor(private readonly groupsDao: GroupsDao) {}

  async execute(data: GetGroupByIdInputDto): Promise<GetGroupByIdOutputDto> {
    const parsedData = getGroupByIdInputValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const group = await this.groupsDao.getGroupById(parsedData.data)
    if (!group) throw new NotFoundException('Group')
    return group
  }
}
