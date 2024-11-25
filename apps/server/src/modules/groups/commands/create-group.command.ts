import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { CreateGroupInputDTO } from '../dtos/create-group-input.dto'
import type { CreateGroupOutputDTO } from '../dtos/create-group-output.dto'
import type { GroupModel } from '../models/group.model'
import type { GroupsRepository } from '../repositories/groups.repository'
import { createGroupValidator } from '../validators/create-group.validator'

export class CreateGroupCommand
  implements Command<CreateGroupInputDTO, Promise<CreateGroupOutputDTO>>
{
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: CreateGroupInputDTO): Promise<CreateGroupOutputDTO> {
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
    return this.groupsRepository.create(group)
  }
}
