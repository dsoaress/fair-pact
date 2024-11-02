import type { UseCase } from '@/shared/base/use-case'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import type { DeleteGroupDto } from '../dtos/delete-group.dto'
import type { GroupsRepository } from '../repositories/groups.repository'
import { deleteGroupValidator } from '../validators/delete-group.validator'

export class DeleteGroupUseCase implements UseCase<DeleteGroupDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: DeleteGroupDto): Promise<void> {
    const parsedData = deleteGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id } = parsedData.data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    await this.groupsRepository.delete(parsedData.data.id)
  }
}