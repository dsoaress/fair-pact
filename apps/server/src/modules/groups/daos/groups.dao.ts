import { desc, eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers, groups } from '@/infra/database/drizzle/schemas'

import type { GetGroupByIdInputDto } from '../dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '../dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '../dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '../dtos/get-groups-output.dto'

export class GroupsDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupById({ id, userId }: GetGroupByIdInputDto): Promise<GetGroupByIdOutputDto | null> {
    const result = await this.drizzleService.query.groups.findFirst({
      where: eq(groups.id, id),
      with: { groupMembers: { where: eq(groupMembers.userId, userId) } },
      columns: { id: true, name: true, currency: true }
    })
    if (!result) return null
    return { id: result.id, name: result.name, currency: result.currency }
  }

  async getGroups({ userId }: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    const result = await this.drizzleService.query.groups.findMany({
      with: { groupMembers: { where: eq(groupMembers.userId, userId) } },
      columns: { id: true, name: true, currency: true },
      orderBy: [desc(groups.createdAt)]
    })
    return result.map(g => ({ id: g.id, name: g.name, currency: g.currency }))
  }
}
