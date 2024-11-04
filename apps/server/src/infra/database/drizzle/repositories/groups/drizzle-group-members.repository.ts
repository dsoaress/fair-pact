import { and, eq, inArray } from 'drizzle-orm'

import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'
import type { GroupMembersRepository } from '@/modules/groups/repositories/group-members.repository'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { db } from '../../drizzle.service'
import { groupMembers } from '../../schemas/groups.schema'

type GroupMemberResult = {
  id: string
  createdAt: Date
  groupId: string
  userId: string
}

export class DrizzleGroupMembersRepository implements GroupMembersRepository {
  async findById(id: string): Promise<GroupMemberModel | null> {
    const result = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.id, id))
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel | null> {
    const result = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId))
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async findManyByGroupIdAndUserId(groupId: string, userId: string): Promise<GroupMemberModel[]> {
    const results = await db.query.groupMembers.findMany({
      where: and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId))
    })
    return results.map(this.mapToModel)
  }

  async findMandyByGroupIdAndMemberIds(
    groupId: string,
    memberIds: string[]
  ): Promise<GroupMemberModel[]> {
    const results = await db.query.groupMembers.findMany({
      where: and(eq(groupMembers.groupId, groupId), inArray(groupMembers.id, memberIds))
    })
    return results.map(this.mapToModel)
  }

  async create(model: GroupMemberModel): Promise<void> {
    await db.insert(groupMembers).values({
      id: model.id.value,
      groupId: model.groupId.value,
      userId: model.userId.value,
      createdAt: model.createdAt
    })
  }

  async delete(id: string): Promise<void> {
    await db.delete(groupMembers).where(eq(groupMembers.id, id))
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
