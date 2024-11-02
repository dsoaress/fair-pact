import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { ConflicException } from '@/shared/exceptions/conflict.exception'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { type CreateGroupDto, CreateGroupSchema } from '../dtos/create-group.dto'
import type { GroupModel } from '../models/group.model'
import type { GroupsRepository } from '../repositories/groups.repository'

type Input = {
  data: CreateGroupDto
  createdBy: string
}

export class CreateGroupUseCase implements UseCase<Input, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute({ createdBy, data }: Input): Promise<void> {
    const parsedData = CreateGroupSchema.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)

    const group: GroupModel = {
      id: IdValueObject.create(),
      name: parsedData.data.name,
      members: parsedData.data.members.map(IdValueObject.create),
      createdBy: IdValueObject.create(createdBy),
      createdAt: new Date()
    }

    const existingGroup = await this.groupsRepository.findByNameAndCreatedBy(
      group.name,
      group.createdBy.value
    )
    if (existingGroup) throw new ConflicException('Group')

    await this.groupsRepository.create(group)
  }
}
