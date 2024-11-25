import type { Repository } from '@/core/base/repository'

import type { GroupModel } from '../models/group.model'

export interface GroupsRepository extends Omit<Repository<GroupModel>, 'create'> {
  findById(id: string): Promise<GroupModel | null>
  create(model: GroupModel): Promise<{ id: string }>
  addGroupMember(groupId: string, memberId: string): Promise<void>
  removeGroupMember(groupId: string, memberId: string): Promise<void>
  update(model: GroupModel): Promise<void>
  delete(id: string): Promise<void>
}
