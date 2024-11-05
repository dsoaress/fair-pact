import { and, eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groups } from '@/infra/database/drizzle/schemas'
import type { Repository } from '@/shared/base/repository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { CurrencyDto } from '../dtos/currency.dto'
import type { GroupModel } from '../models/group.model'

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

export class GroupsRepository implements Repository<GroupModel> {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string): Promise<GroupModel | null> {
    const result = await this.drizzleService.query.groups.findFirst({
      where: and(eq(groups.id, id)),
      with: { groupMembers: { columns: { id: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findByNameAndCreatedBy(name: string, createdBy: string): Promise<GroupModel | null> {
    const result = await this.drizzleService.query.groups.findFirst({
      where: and(eq(groups.name, name), eq(groups.createdBy, createdBy)),
      with: { groupMembers: { columns: { id: true } } }
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: GroupModel): Promise<void> {
    await this.drizzleService.insert(groups).values({
      id: model.id.value,
      name: model.name,
      currency: model.currency,
      createdAt: model.createdAt,
      createdBy: model.createdBy.value
    })
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
      members: result.groupMembers.map(member => IdValueObject.create(member.id)),
      createdBy: IdValueObject.create(result.createdBy),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt ?? undefined,
      updatedBy: result.updatedBy ? IdValueObject.create(result.updatedBy) : undefined
    }
  }
}
