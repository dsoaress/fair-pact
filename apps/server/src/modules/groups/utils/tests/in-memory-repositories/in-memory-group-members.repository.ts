import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'
import type { GroupMembersRepository } from '@/modules/groups/repositories/group-members.repository'

export class InMemoryGroupMembersRepository implements GroupMembersRepository {
  constructor(private readonly groupMembers: GroupMemberModel[] = []) {}

  async findById(id: string): Promise<GroupMemberModel | null> {
    return this.groupMembers.find(groupMember => groupMember.id.value === id) || null
  }

  async findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null> {
    return (
      this.groupMembers.find(
        groupMember => groupMember.groupId.value === groupId && groupMember.userId.value === userId
      ) || null
    )
  }

  async findManyByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel[]> {
    return this.groupMembers.filter(
      groupMember => groupMember.groupId.value === groupId && groupMember.userId.value === userId
    )
  }

  async findMandyByGroupIdAndMemberIds(
    groupId: string,
    memberIds: string[]
  ): Promise<GroupMemberModel[]> {
    return this.groupMembers.filter(
      groupMember =>
        groupMember.groupId.value === groupId && memberIds.includes(groupMember.userId.value)
    )
  }

  async create(model: GroupMemberModel): Promise<void> {
    this.groupMembers.push(model)
  }

  async delete(id: string): Promise<void> {
    const index = this.groupMembers.findIndex(groupMember => groupMember.id.value === id)
    this.groupMembers.splice(index, 1)
  }
}
