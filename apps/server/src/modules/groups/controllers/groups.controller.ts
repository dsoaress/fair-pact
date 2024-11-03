import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { CreateGroupDto } from '../dtos/create-group.dto'
import type { DeleteGroupDto } from '../dtos/delete-group.dto'
import type { UpdateGroupDto } from '../dtos/update-group.dto'
import type { CreateGroupUseCase } from '../use-cases/create-group.use-case'
import type { DeleteGroupUseCase } from '../use-cases/delete-group.use-case'
import type { UpdateGroupUseCase } from '../use-cases/update-group.use-case'

export class GroupsController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase
  ) {}

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
