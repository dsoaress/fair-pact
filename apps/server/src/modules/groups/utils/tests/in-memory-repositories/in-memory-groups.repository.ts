import type { GroupModel } from '@/modules/groups/models/group.model'
import { GroupsRepository } from '@/modules/groups/repositories/groups.repository'

export class InMemoryGroupsRepository extends GroupsRepository {
  constructor(private readonly groups: GroupModel[] = []) {
    super({} as never)
  }

  async findById(id: string): Promise<GroupModel | null> {
    return this.groups.find(group => group.id.value === id) || null
  }

  async findByNameAndCreatedBy(name: string, createdBy: string): Promise<GroupModel | null> {
    return (
      this.groups.find(group => group.name === name && group.createdBy.value === createdBy) || null
    )
  }

  async create(model: GroupModel): Promise<void> {
    this.groups.push(model)
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
