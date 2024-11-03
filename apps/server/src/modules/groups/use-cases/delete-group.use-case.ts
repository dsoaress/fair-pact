import type { UseCase } from '@/shared/base/use-case'
import { ForbiddenException } from '@/shared/exceptions/forbidden.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { type DeleteGroupDto, DeleteGroupSchema } from '../dtos/delete-group.dto'
import type { GroupsRepository } from '../repositories/groups.repository'

export class DeleteGroupUseCase implements UseCase<DeleteGroupDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: DeleteGroupDto): Promise<void> {
    const parsedData = DeleteGroupSchema.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)

    const group = await this.groupsRepository.findById(parsedData.data.id)
    if (!group) throw new NotFoundException('Group')

    if (group.createdBy.value !== parsedData.data.userId)
      throw new ForbiddenException('You are not allowed to delete this group')

    await this.groupsRepository.delete(parsedData.data.id)
  }
}
