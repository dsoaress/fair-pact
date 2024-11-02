import type { GetGroupByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '@fair-pact/contracts/groups/dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import { desc, eq } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { groupMembers, groups } from '@/infra/database/drizzle/schemas'

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
