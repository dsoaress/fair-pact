import type { GetGroupByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '@fair-pact/contracts/groups/dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import { and, desc, eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers, groups } from '@/infra/database/drizzle/schemas'

export class GroupsDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupById({ id, userId }: GetGroupByIdInputDto): Promise<GetGroupByIdOutputDto | null> {
    const result = await this.drizzleService
      .select({ id: groups.id, name: groups.name, currency: groups.currency })
      .from(groups)
      .leftJoin(groupMembers, eq(groups.id, groupMembers.groupId))
      .where(and(eq(groups.id, id), eq(groupMembers.userId, userId)))
      .limit(1)
    if (result.length === 0) return null
    return result[0]
  }

  async getGroups({ userId }: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    return this.drizzleService
      .select({ id: groups.id, name: groups.name, currency: groups.currency })
      .from(groups)
      .leftJoin(groupMembers, eq(groups.id, groupMembers.groupId))
      .where(eq(groupMembers.userId, userId))
      .orderBy(desc(groups.createdAt))
  }
}
