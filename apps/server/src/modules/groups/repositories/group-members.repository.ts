import type { Repository } from '@/shared/base/repository'

import type { GroupMemberModel } from '../models/group-member.model'

export interface GroupMembersRepository extends Omit<Repository<GroupMemberModel>, 'delete'> {
  findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null>
  create(model: GroupMemberModel): Promise<void>
  update(model: GroupMemberModel): Promise<void>
  delete(groupId: string, userId: string): Promise<void>
}
