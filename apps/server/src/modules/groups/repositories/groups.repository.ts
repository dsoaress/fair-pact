import { type CurrencyDto, IdValueObject } from 'contracts'
import { and, eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers, groups } from '@/infra/database/drizzle/schemas'
import type { Repository } from '@/shared/base/repository'

import type { GroupModel } from '../models/group.model'

type GroupResult = {
  id: string
  name: string
  currency: string
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
  members: {
    userId: string
  }[]
}

export class GroupsRepository implements Repository<GroupModel> {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string): Promise<GroupModel | null> {
    const result = await this.drizzleService.query.groups.findFirst({
      where: and(eq(groups.id, id)),
      with: { members: { columns: { userId: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupModel): Promise<void> {
    await this.drizzleService.transaction(async tx => {
      await tx.insert(groups).values({
        id: model.id.value,
        name: model.name,
        currency: model.currency,
        createdAt: model.createdAt,
        createdBy: model.createdBy.value
      })

      await tx.insert(groupMembers).values({
        userId: model.createdBy.value,
        groupId: model.id.value,
        createdAt: model.createdAt
      })
    })
  }

  async addGroupMember(groupId: string, userId: string): Promise<void> {
    await this.drizzleService.insert(groupMembers).values({
      userId,
      groupId,
      createdAt: new Date()
    })
  }

  async removeGroupMember(groupId: string, userId: string): Promise<void> {
    await this.drizzleService
      .delete(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId)))
  }

  async update(model: GroupModel): Promise<void> {
    await this.drizzleService
      .update(groups)
      .set({
        name: model.name,
        currency: model.currency,
        updatedAt: model.updatedAt,
        updatedBy: model.updatedBy?.value
      })
      .where(eq(groups.id, model.id.value))
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.delete(groups).where(eq(groups.id, id))
  }

  private mapToModel(result: GroupResult): GroupModel {
    return {
      id: IdValueObject.create(result.id),
      name: result.name,
      currency: result.currency as CurrencyDto,
      members: result.members.map(member => IdValueObject.create(member.userId)),
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt ?? undefined,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined
    }
  }
}
