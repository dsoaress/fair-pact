import type { DeleteGroupDto } from '@fair-pact/contracts/groups/dtos/delete-group.dto'
import { deleteGroupValidator } from '@fair-pact/contracts/groups/validators/delete-group.validator'

import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

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
