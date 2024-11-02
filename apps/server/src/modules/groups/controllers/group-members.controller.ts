import type { CreateGroupMemberDto } from '@fair-pact/contracts/groups/dtos/create-group-member.dto'
import type { DeleteGroupMemberDto } from '@fair-pact/contracts/groups/dtos/delete-group-member.dto'

import { type HttpResponse, httpStatusCode } from '@/shared/base/http-response'

import type { CreateGroupMemberUseCase } from '../use-cases/create-group-member.use-case'
import type { DeleteGroupMemberUseCase } from '../use-cases/delete-group-member.use-case'

export class GroupMembersController {
  constructor(
    private readonly createGroupMemberUseCase: CreateGroupMemberUseCase,
    private readonly deleteGroupMemberUseCase: DeleteGroupMemberUseCase
  ) {}

  async createGroupMember(data: CreateGroupMemberDto): Promise<HttpResponse<void>> {
    await this.createGroupMemberUseCase.execute(data)
    return { statusCode: httpStatusCode.CREATED }
  }

  async deleteGroupMember(data: DeleteGroupMemberDto): Promise<HttpResponse<void>> {
    await this.deleteGroupMemberUseCase.execute(data)
    return { statusCode: httpStatusCode.NO_CONTENT }
  }
}
