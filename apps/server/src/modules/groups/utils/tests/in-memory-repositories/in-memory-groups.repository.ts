import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupModel } from '@/modules/groups/models/group.model'
import type { GroupsRepository } from '@/modules/groups/repositories/groups.repository'

export class InMemoryGroupsRepository implements GroupsRepository {
  constructor(private readonly groups: GroupModel[] = []) {}

  async findById(id: string): Promise<GroupModel | null> {
    return this.groups.find(group => group.id.value === id) || null
  }

  async create(model: GroupModel): Promise<{ id: string }> {
    this.groups.push(model)
    return { id: model.id.value }
  }

  async addGroupMember(groupId: string, memberId: string): Promise<void> {
    const group = this.groups.find(group => group.id.value === groupId)
    if (!group) return
    group.members.push(IdValueObject.create(memberId))
  }

  async removeGroupMember(groupId: string, memberId: string): Promise<void> {
    const group = this.groups.find(group => group.id.value === groupId)
    if (!group) return
    const index = group.members.findIndex(member => member.value === memberId)
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
