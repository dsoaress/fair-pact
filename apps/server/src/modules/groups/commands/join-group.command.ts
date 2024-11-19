import { type JoinGroupDTO, joinGroupValidator } from 'contracts'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { ConflictException } from '@/shared/exceptions/conflict.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

export class JoinGroupCommand implements Command<JoinGroupDTO, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: JoinGroupDTO): Promise<void> {
    const parsedData = joinGroupValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { id, memberId } = parsedData.data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    const member = group.members.find(member => member.value === memberId)
    if (member) throw new ConflictException('Member')
    await this.groupsRepository.addGroupMember(id, memberId)
  }
}
