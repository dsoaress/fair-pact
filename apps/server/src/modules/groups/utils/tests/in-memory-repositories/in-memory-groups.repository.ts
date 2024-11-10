import { IdValueObject } from 'contracts'

import type { GroupModel } from '@/modules/groups/models/group.model'
import { GroupsRepository } from '@/modules/groups/repositories/groups.repository'

export class InMemoryGroupsRepository extends GroupsRepository {
  constructor(private readonly groups: GroupModel[] = []) {
    super({} as never)
  }

  async findById(id: string): Promise<GroupModel | null> {
    return this.groups.find(group => group.id.value === id) || null
  }

  async create(model: GroupModel): Promise<void> {
    this.groups.push(model)
  }

  async addGroupMember(groupId: string, userId: string): Promise<void> {
    const group = this.groups.find(group => group.id.value === groupId)
    if (!group) return
    group.members.push(IdValueObject.create(userId))
  }

  async removeGroupMember(groupId: string, userId: string): Promise<void> {
    const group = this.groups.find(group => group.id.value === groupId)
    if (!group) return
    const index = group.members.findIndex(member => member.value === userId)
    group.members.splice(index, 1)
  }

  async update(model: GroupModel): Promise<void> {
    const index = this.groups.findIndex(group => group.id.value === model.id.value)
    this.groups[index] = model
  }

  async delete(id: string): Promise<void> {
    const index = this.groups.findIndex(group => group.id.value === id)
    this.groups.splice(index, 1)
  }
}
