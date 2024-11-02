import type { UpdateGroupDto } from '@fair-pact/contracts/groups/dtos/update-group.dto'
import { updateGroupValidator } from '@fair-pact/contracts/groups/validators/update-group.validator'
import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

export class UpdateGroupUseCase implements UseCase<UpdateGroupDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: UpdateGroupDto): Promise<void> {
    const parsedData = updateGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const group = await this.groupsRepository.findById(data.id)
    if (!group) throw new NotFoundException('Group')
    group.name = parsedData.data.name || group.name
    group.currency = parsedData.data.currency || group.currency
    group.updatedBy = IdValueObject.create(data.updatedBy)
    group.updatedAt = new Date()
    await this.groupsRepository.update(group)
  }
}
