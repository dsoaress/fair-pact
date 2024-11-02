import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'
import { GroupMembersRepository } from '@/modules/groups/repositories/group-members.repository'

export class InMemoryGroupMembersRepository extends GroupMembersRepository {
  constructor(private readonly groupMembers: GroupMemberModel[] = []) {
    super({} as never)
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

  async findMandyByGroupIdAndUserIds(
    groupId: string,
    userIds: string[]
  ): Promise<GroupMemberModel[]> {
    return this.groupMembers.filter(
      groupMember =>
        groupMember.groupId.value === groupId && userIds.includes(groupMember.userId.value)
    )
  }

  async create(model: GroupMemberModel): Promise<void> {
    this.groupMembers.push(model)
  }

  async delete(groupId: string, userId: string): Promise<void> {
    const index = this.groupMembers.findIndex(
      groupMember => groupMember.groupId.value === groupId && groupMember.userId.value === userId
    )
    this.groupMembers.splice(index, 1)
  }
}
