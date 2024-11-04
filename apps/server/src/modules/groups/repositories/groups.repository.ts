import type { Repository } from '@/shared/base/repository'

import type { GroupModel } from '../models/group.model'

export interface GroupsRepository extends Repository<GroupModel> {
  findById(id: string): Promise<GroupModel | null>
  findByNameAndCreatedBy(name: string, createdBy: string): Promise<GroupModel | null>
  create(model: GroupModel): Promise<void>
  update(model: GroupModel): Promise<void>
  delete(id: string, deletedBy: string): Promise<void>
}
