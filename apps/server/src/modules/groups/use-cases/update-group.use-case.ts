import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { type UpdateGroupDto, UpdateGroupSchema } from '../dtos/update-group.dto'
import type { GroupsRepository } from '../repositories/groups.repository'

type Input = {
  id: string
  data: UpdateGroupDto
  updatedBy: string
}

export class UpdateGroupUseCase implements UseCase<Input, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute({ updatedBy, data, id }: Input): Promise<void> {
    const parsedData = UpdateGroupSchema.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)

    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')

    group.name = parsedData.data.name || group.name
    group.members = parsedData.data.members?.map(IdValueObject.create) || group.members
    group.updatedBy = IdValueObject.create(updatedBy)
    group.updatedAt = new Date()

    await this.groupsRepository.update(group)
  }
}
