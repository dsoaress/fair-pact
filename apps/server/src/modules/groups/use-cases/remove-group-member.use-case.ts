import type { UseCase } from '@/shared/base/use-case'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import type { GroupsRepository } from '../repositories/groups.repository'

// TODO: create dto
type Input = {
  id: string
  userId: string
}

export class RemoveGroupMemberUseCase implements UseCase<Input, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute(data: Input): Promise<void> {
    // TODO: validate data
    const { id, userId } = data
    const group = await this.groupsRepository.findById(id)
    if (!group) throw new NotFoundException('Group')
    const member = group.members.find(member => member.value === userId)
    if (!member) throw new NotFoundException('Member')
    await this.groupsRepository.removeGroupMember(id, userId)
  }
}
