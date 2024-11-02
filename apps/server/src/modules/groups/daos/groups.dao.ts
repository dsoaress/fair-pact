import type { GetGroupByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '@fair-pact/contracts/groups/dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groups,
  users
} from '@/infra/database/drizzle/schemas'
import { sql } from 'drizzle-orm'

export class GroupsDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupById({ id, userId }: GetGroupByIdInputDto): Promise<GetGroupByIdOutputDto | null> {
    const query = sql`
      SELECT ${groups.id}, ${groups.name}, ${groups.currency},
        jsonb_agg(
          jsonb_build_object(
            'userId', final_balances.other_user_id, 'firstName', ${users.firstName}, 'lastName', ${users.lastName},
            'amount', 
            CASE 
              WHEN final_balances.total_amount > 0 THEN final_balances.total_amount
              ELSE final_balances.total_amount  
            END
          ),
        ) AS balance
      FROM ${groups}
      JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId}
      JOIN LATERAL (
        SELECT other_user_id, SUM(amount) AS total_amount
        FROM (
          SELECT 
            CASE 
              WHEN ${groupTransactionParticipants.payerUserId} = ${userId} THEN ${groupTransactionParticipants.userId}
              ELSE ${groupTransactionParticipants.payerUserId}
            END AS other_user_id,
            CASE 
              WHEN ${groupTransactionParticipants.payerUserId} = ${userId} THEN ${groupTransactionParticipants.amount} 
              ELSE - ${groupTransactionParticipants.amount}
            END AS amount
          FROM ${groupTransactionParticipants}
          WHERE 
            ${groupTransactionParticipants.groupId} = ${groups.id}
            AND (${groupTransactionParticipants.payerUserId} = ${userId} OR ${groupTransactionParticipants.userId} = ${userId})
        ) AS user_balances
        WHERE other_user_id != ${userId}
        GROUP BY other_user_id
      ) AS final_balances ON TRUE
      JOIN ${users} ON ${users.id} = final_balances.other_user_id
      WHERE ${groups.id} = ${id} AND ${groupMembers.userId} = ${userId}
      GROUP BY ${groups.id}, ${groups.name}, ${groups.currency};
    `
    const { rows } = await this.drizzleService.execute(query)
    if (rows.length === 0) return null
    return rows[0] as GetGroupByIdOutputDto
  }

  async getGroups({ userId }: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    const query = sql`
      SELECT
        ${groups.id}, ${groups.name}, ${groups.currency},
        CAST(COALESCE((
          (SELECT COALESCE(SUM(${groupTransactionParticipants.amount}), 0)
          FROM ${groupTransactionParticipants}
          WHERE ${groupTransactionParticipants.groupId} = ${groups.id} AND ${groupTransactionParticipants.payerUserId} = ${userId})
          -
          (SELECT COALESCE(SUM(${groupTransactionParticipants.amount}), 0)
          FROM ${groupTransactionParticipants}
          WHERE ${groupTransactionParticipants.groupId} = ${groups.id} AND ${groupTransactionParticipants.userId} = ${userId})
        ), 0) AS integer) AS balance
      FROM ${groups}
      LEFT JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId}
      WHERE ${groupMembers.userId} = ${userId}
      ORDER BY ${groups.name} DESC;
    `
    const { rows } = await this.drizzleService.execute(query)
    return rows as GetGroupsOutputDto
  }
}
