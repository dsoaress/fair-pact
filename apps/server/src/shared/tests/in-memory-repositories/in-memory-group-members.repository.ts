import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'
import type { GroupMembersRepository } from '@/modules/groups/repositories/group-members.repository'

export class InMemoryGroupMembersRepository implements GroupMembersRepository {
  constructor(private readonly groupMembers: GroupMemberModel[] = []) {}

  async findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null> {
    return (
      this.groupMembers.find(
        groupMember => groupMember.groupId.value === groupId && groupMember.userId.value === userId
      ) || null
    )
  }

  async create(model: GroupMemberModel): Promise<void> {
    this.groupMembers.push(model)
  }

  async update(model: GroupMemberModel): Promise<void> {
    const index = this.groupMembers.findIndex(
      groupMember =>
        groupMember.groupId.value === model.groupId.value &&
        groupMember.userId.value === model.userId.value
    )
    this.groupMembers[index] = model
  }

  async delete(groupId: string, userId: string): Promise<void> {
    const index = this.groupMembers.findIndex(
      groupMember => groupMember.groupId.value === groupId && groupMember.userId.value === userId
    )
    this.groupMembers.splice(index, 1)
  }
}
