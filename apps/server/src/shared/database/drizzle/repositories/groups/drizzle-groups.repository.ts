import { and, eq } from 'drizzle-orm'

import type { CurrencyDTO } from '@/modules/groups/dtos/currency.dto'
import type { GroupModel } from '@/modules/groups/models/group.model'
import type { GroupsRepository } from '@/modules/groups/repositories/groups.repository'
import type { CacheService } from '@/shared/base/cache-service'
import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import { groupMembers, groups } from '@/shared/database/drizzle/schemas'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

type GroupResult = {
  id: string
  name: string
  currency: string
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
  members: {
    memberId: string
  }[]
}

export class DrizzleGroupsRepository implements GroupsRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly cacheService: CacheService
  ) {}

  async findById(id: string): Promise<GroupModel | null> {
    const result = await this.drizzleService.query.groups.findFirst({
      where: eq(groups.id, id),
      with: { members: { columns: { memberId: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupModel): Promise<{ id: string }> {
    return this.drizzleService.transaction(async tx => {
      const result = await tx
        .insert(groups)
        .values({
          id: model.id.value,
          name: model.name,
          currency: model.currency,
          createdAt: model.createdAt,
          createdBy: model.createdBy.value
        })
        .returning({ id: groups.id })

      await tx.insert(groupMembers).values({
        memberId: model.createdBy.value,
        groupId: model.id.value,
        createdAt: model.createdAt
      })

      return { id: result[0].id }
    })
  }

  async addGroupMember(groupId: string, memberId: string): Promise<void> {
    await this.drizzleService.insert(groupMembers).values({
      memberId,
      groupId,
      createdAt: new Date()
    })
  }

  async removeGroupMember(groupId: string, memberId: string): Promise<void> {
    await this.drizzleService
      .delete(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.memberId, memberId)))
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
      currency: result.currency as CurrencyDTO,
      members: result.members.map(member => IdValueObject.create(member.memberId)),
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt ?? undefined,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined
    }
  }
}
