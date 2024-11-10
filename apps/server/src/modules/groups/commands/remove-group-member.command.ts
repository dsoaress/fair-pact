import { type RemoveGroupMemberDto, removeGroupMemberValidator } from 'contracts'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

export class RemoveGroupMemberCommand implements Command<RemoveGroupMemberDto, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: RemoveGroupMemberDto): Promise<void> {
    const parsedData = removeGroupMemberValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id, userId } = parsedData.data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    const member = group.members.find(member => member.value === userId)
    if (!member) throw new NotFoundException('Member')
    await this.groupsRepository.removeGroupMember(id, userId)
  }
}
