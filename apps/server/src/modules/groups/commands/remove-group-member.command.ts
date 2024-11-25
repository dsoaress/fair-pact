import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import type { RemoveGroupMemberDTO } from '../dtos/remove-group-member.dto'
import type { GroupsRepository } from '../repositories/groups.repository'
import { removeGroupMemberValidator } from '../validators/remove-group-member.validator'

export class RemoveGroupMemberCommand implements Command<RemoveGroupMemberDTO, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: RemoveGroupMemberDTO): Promise<void> {
    const parsedData = removeGroupMemberValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id, memberId } = parsedData.data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    const member = group.members.find(member => member.value === memberId)
    if (!member) throw new NotFoundException('Member')
    await this.groupsRepository.removeGroupMember(id, memberId)
  }
}
