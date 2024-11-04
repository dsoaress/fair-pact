import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { ConflicException } from '@/shared/exceptions/conflict.exception'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { CreateGroupDto } from '../dtos/create-group.dto'
import type { GroupMemberModel } from '../models/group-member.model'
import type { GroupModel } from '../models/group.model'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { createGroupValidator } from '../validators/create-group.validator'

export class CreateGroupUseCase implements UseCase<CreateGroupDto, Promise<void>> {
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupMembersRepository: GroupMembersRepository
  ) {}

  async execute(data: CreateGroupDto): Promise<void> {
    const parsedData = createGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const group: GroupModel = {
      id: IdValueObject.create(),
      name: parsedData.data.name,
      currency: parsedData.data.currency,
      members: [],
      createdBy: IdValueObject.create(data.createdBy),
      createdAt: new Date()
    }
    const groupMember: GroupMemberModel = {
      id: IdValueObject.create(),
      groupId: group.id,
      userId: group.createdBy,
      createdAt: new Date()
    }
    const existingGroup = await this.groupsRepository.findByNameAndCreatedBy(
      group.name,
      group.createdBy.value
    )
    if (existingGroup) throw new ConflicException('Group')
    await Promise.all([
      this.groupsRepository.create(group),
      this.groupMembersRepository.create(groupMember)
    ])
  }
}
