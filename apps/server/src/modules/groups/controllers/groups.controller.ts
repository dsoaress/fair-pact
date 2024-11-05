import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { CreateGroupDto } from '../dtos/create-group.dto'
import type { DeleteGroupDto } from '../dtos/delete-group.dto'
import type { GetGroupByIdInputDto } from '../dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '../dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '../dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '../dtos/get-groups-output.dto'
import type { UpdateGroupDto } from '../dtos/update-group.dto'
import type { GetGroupByIdQuery } from '../queries/get-group-by-id.query'
import type { GetGroupsQuery } from '../queries/get-groups.query'
import type { CreateGroupUseCase } from '../use-cases/create-group.use-case'
import type { DeleteGroupUseCase } from '../use-cases/delete-group.use-case'
import type { UpdateGroupUseCase } from '../use-cases/update-group.use-case'

export class GroupsController {
  constructor(
    private readonly getGroupByIdQuery: GetGroupByIdQuery,
    private readonly getGroupsQuery: GetGroupsQuery,
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase
  ) {}

  async getGroupById(data: GetGroupByIdInputDto): Promise<HttpResponse<GetGroupByIdOutputDto>> {
    const group = await this.getGroupByIdQuery.execute(data)
    return { statusCode: httpStatusCode.OK, data: group }
  }

  async getGroups(data: GetGroupsInputDto): Promise<HttpResponse<GetGroupsOutputDto>> {
    const groups = await this.getGroupsQuery.execute(data)
    return { statusCode: httpStatusCode.OK, data: groups }
  }

  async createGroup(data: CreateGroupDto): Promise<HttpResponse<void>> {
    await this.createGroupUseCase.execute(data)
    return { statusCode: httpStatusCode.CREATED }
  }

  async updateGroup(data: UpdateGroupDto): Promise<HttpResponse<void>> {
    await this.updateGroupUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }

  async deleteGroup(data: DeleteGroupDto): Promise<HttpResponse<void>> {
    await this.deleteGroupUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }
}
