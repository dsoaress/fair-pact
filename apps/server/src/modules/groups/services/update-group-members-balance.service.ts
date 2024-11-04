import type { IdValueObject } from '@/shared/value-objects/id.value-object'
import type { GroupMembersRepository } from '../repositories/group-members.repository'

type Input = {
  groupId: string
  participants?: {
    memberId: IdValueObject
    amount: number
  }[]
}

export class UpdateGroupMembersBalanceService {
  constructor(private readonly groupMembersRepository: GroupMembersRepository) {}

  async execute({ groupId, participants }: Input): Promise<void> {
    if (!participants) return
    const memberIds = participants.map(({ memberId }) => memberId.value)
    const groupMembers = await this.groupMembersRepository.findMandyByGroupIdAndMemberIds(
      groupId,
      memberIds
    )
    for (const groupMember of groupMembers) {
      const participant = participants.find(
        ({ memberId }) => memberId.value === groupMember.id.value
      )
      if (!participant) continue
      groupMember.balance += participant.amount
    }
    await Promise.all(groupMembers.map(this.groupMembersRepository.update))
  }
}
