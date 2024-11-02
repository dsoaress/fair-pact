import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'
import { and, eq, inArray } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers } from '@/infra/database/drizzle/schemas'
import type { Repository } from '@/shared/base/repository'

import type { GroupMemberModel } from '../models/group-member.model'

type GroupMemberResult = {
  id: string
  createdAt: Date
  groupId: string
  userId: string
}

export class GroupMembersRepository implements Repository<GroupMemberModel> {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string): Promise<GroupMemberModel | null> {
    const result = await this.drizzleService.query.groupMembers.findFirst({
      where: and(eq(groupMembers.id, id))
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null> {
    const result = await this.drizzleService.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId))
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findManyByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel[]> {
    const results = await this.drizzleService.query.groupMembers.findMany({
      where: and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId))
    })
    return results.map(this.mapToModel)
  }

  async findMandyByGroupIdAndMemberIds(
    groupId: string,
    memberIds: string[]
  ): Promise<GroupMemberModel[]> {
    const results = await this.drizzleService.query.groupMembers.findMany({
      where: and(eq(groupMembers.groupId, groupId), inArray(groupMembers.id, memberIds))
    })
    return results.map(this.mapToModel)
  }

  async create(model: GroupMemberModel): Promise<void> {
    await this.drizzleService.insert(groupMembers).values({
      id: model.id.value,
      groupId: model.groupId.value,
      userId: model.userId.value,
      createdAt: model.createdAt
    })
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.delete(groupMembers).where(eq(groupMembers.id, id))
  }

  private mapToModel(result: GroupMemberResult): GroupMemberModel {
    return {
      id: IdValueObject.create(result.id),
      groupId: IdValueObject.create(result.groupId),
      userId: IdValueObject.create(result.userId),
      createdAt: result.createdAt
    }
  }
}
