import type { CreateGroupMemberDto } from '@fair-pact/contracts/groups/dtos/create-group-member.dto'
import { createGroupMemberValidator } from '@fair-pact/contracts/groups/validators/create-group-member.validator'
import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupMemberModel } from '../models/group-member.model'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'

export class CreateGroupMemberUseCase implements UseCase<CreateGroupMemberDto, Promise<void>> {
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupMembersRepository: GroupMembersRepository
  ) {}

  async execute(data: CreateGroupMemberDto): Promise<void> {
    const parsedData = createGroupMemberValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const group = await this.groupsRepository.findById(parsedData.data.groupId)
    if (!group) throw new NotFoundException('Group')
    const groupMember: GroupMemberModel = {
      id: IdValueObject.create(),
      groupId: IdValueObject.create(parsedData.data.groupId),
      userId: IdValueObject.create(parsedData.data.userId),
      createdAt: new Date()
    }
    await this.groupMembersRepository.create(groupMember)
  }
}
