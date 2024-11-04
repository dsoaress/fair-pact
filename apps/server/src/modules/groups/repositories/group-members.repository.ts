import type { Repository } from '@/shared/base/repository'

import type { GroupMemberModel } from '../models/group-member.model'

export interface GroupMembersRepository extends Repository<GroupMemberModel> {
  findById(id: string): Promise<GroupMemberModel | null>
  findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null>
  findMandyByGroupIdAndMemberIds(groupId: string, memberIds: string[]): Promise<GroupMemberModel[]>
  findManyByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel[]>
  create(model: GroupMemberModel): Promise<void>
  delete(id: string): Promise<void>
}
