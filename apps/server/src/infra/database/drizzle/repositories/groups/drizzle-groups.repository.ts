import { and, eq } from 'drizzle-orm'

import type { CurrencyDto } from '@/modules/groups/dtos/currency.dto'
import type { GroupModel } from '@/modules/groups/models/group.model'
import type { GroupsRepository } from '@/modules/groups/repositories/groups.repository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { db } from '../../drizzle.service'
import { groups } from '../../schemas/groups.schema'

type GroupResult = {
  id: string
  name: string
  currency: string
  createdBy: string
  createdAt: Date
  updatedBy: string | null
  updatedAt: Date | null
  groupMembers: {
    id: string
  }[]
}

export class DrizzleGroupsRepository implements GroupsRepository {
  async findById(id: string): Promise<GroupModel | null> {
    const result = await db.query.groups.findFirst({
      where: and(eq(groups.id, id)),
      with: {
        groupMembers: { columns: { id: true } }
      }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findByNameAndCreatedBy(name: string, createdBy: string): Promise<GroupModel | null> {
    const result = await db.query.groups.findFirst({
      where: and(eq(groups.name, name), eq(groups.createdBy, createdBy)),
      with: {
        groupMembers: { columns: { id: true } }
      }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupModel): Promise<void> {
    await db.insert(groups).values({
      id: model.id.value,
      name: model.name,
      currency: model.currency,
      createdAt: model.createdAt,
      createdBy: model.createdBy.value
    })
  }

  async update(model: GroupModel): Promise<void> {
    await db
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
    await db.delete(groups).where(eq(groups.id, id))
  }

  private mapToModel(result: GroupResult): GroupModel {
    return {
      id: IdValueObject.create(result.id),
      name: result.name,
      currency: result.currency as CurrencyDto,
      members: result.groupMembers.map(member => IdValueObject.create(member.id)),
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt ?? undefined,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined
    }
  }
}
