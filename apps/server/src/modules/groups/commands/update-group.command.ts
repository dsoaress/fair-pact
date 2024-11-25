import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { UpdateGroupDTO } from '../dtos/update-group.dto'
import type { GroupsRepository } from '../repositories/groups.repository'
import { updateGroupValidator } from '../validators/update-group.validator'

export class UpdateGroupCommand implements Command<UpdateGroupDTO, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: UpdateGroupDTO): Promise<void> {
    const parsedData = updateGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const group = await this.groupsRepository.findById(data.id)
    if (!group) throw new NotFoundException('Group')
    group.name = parsedData.data.name ?? group.name
    group.currency = parsedData.data.currency ?? group.currency
    group.updatedBy = IdValueObject.create(data.updatedBy)
    group.updatedAt = new Date()
    await this.groupsRepository.update(group)
  }
}
