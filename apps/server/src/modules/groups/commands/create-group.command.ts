import type { CreateGroupDto } from '@fair-pact/contracts/groups/dtos/create-group.dto'
import { createGroupValidator } from '@fair-pact/contracts/groups/validators/create-group.validator'
import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'

import type { GroupModel } from '../models/group.model'
import type { GroupsRepository } from '../repositories/groups.repository'

export class CreateGroupCommand implements Command<CreateGroupDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: CreateGroupDto): Promise<void> {
    const parsedData = createGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const group: GroupModel = {
      id: IdValueObject.create(),
      name: parsedData.data.name,
      currency: parsedData.data.currency,
      members: [],
      createdBy: IdValueObject.create(data.createdBy),
      createdAt: new Date()
    }
    await this.groupsRepository.create(group)
  }
}
