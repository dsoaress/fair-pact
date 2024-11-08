import type { RemoveGroupMemberDto } from '@fair-pact/contracts/groups/dtos/remove-group-member.dto'
import { removeGroupMemberValidator } from '@fair-pact/contracts/groups/validators/remove-group-member.validator'

import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

export class RemoveGroupMemberUseCase implements UseCase<RemoveGroupMemberDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: RemoveGroupMemberDto): Promise<void> {
    const parsedData = removeGroupMemberValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id, userId } = parsedData.data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    const member = group.members.find(member => member.value === userId)
    if (!member) throw new NotFoundException('Member')
    await this.groupsRepository.removeGroupMember(id, userId)
  }
}
