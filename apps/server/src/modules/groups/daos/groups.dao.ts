import type { GetGroupByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDto } from '@fair-pact/contracts/groups/dtos/get-groups-input.dto'
import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import { and, eq, sql } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '@/infra/database/drizzle/schemas'

export class GroupsDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupById({ id, userId }: GetGroupByIdInputDto): Promise<GetGroupByIdOutputDto | null> {
    const query = sql`
      SELECT 
        ${groups.id}, 
        ${groups.name}, 
        ${groups.currency},
        jsonb_agg(
          jsonb_build_object(
            'userId', final_balances.other_user_id, 'firstName', ${users.firstName}, 'lastName', ${users.lastName},
            'amount', 
            CASE 
              WHEN final_balances.total_amount > 0 THEN final_balances.total_amount
              ELSE final_balances.total_amount  
            END
          )
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
          JOIN ${groupTransactions} ON ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
          WHERE 
            ${groupTransactionParticipants.groupId} = ${groups.id}
            AND (${groupTransactionParticipants.payerUserId} = ${userId} OR ${groupTransactionParticipants.userId} = ${userId})
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
        ) AS user_balances
        WHERE other_user_id != ${userId}
        GROUP BY other_user_id
      ) AS final_balances ON TRUE
      JOIN ${users} ON ${users.id} = final_balances.other_user_id
      WHERE ${groups.id} = ${id} AND ${groupMembers.userId} = ${userId}
      GROUP BY ${groups.id}, ${groups.name}, ${groups.currency};
    `
    const { rows } = await this.drizzleService.execute(query)
    if (rows.length === 0) {
      // TODO: fix this
      // If no rows are returns, is possible that the group has no transactions
      // This is a bug on the first query, we need to make a second query to get the group data
      const result = await this.drizzleService
        .select({
          id: groups.id,
          name: groups.name,
          currency: groups.currency,
          balance: sql<[]>`jsonb_build_array()`
        })
        .from(groups)
        .where(and(eq(groups.id, id), eq(groupMembers.userId, userId)))
        .leftJoin(groupMembers, eq(groupMembers.groupId, groups.id))
      if (!result) return null
      return result[0]
    }
    return rows[0] as GetGroupByIdOutputDto
  }

  async getGroups({ userId }: GetGroupsInputDto): Promise<GetGroupsOutputDto> {
    const query = sql`
      SELECT
        ${groups.id}, 
        ${groups.name}, 
        ${groups.currency},
        CAST(COALESCE((
          (SELECT COALESCE(SUM(${groupTransactionParticipants.amount}), 0)
          FROM ${groupTransactionParticipants}
          JOIN ${groupTransactions} ON ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
          WHERE ${groupTransactionParticipants.groupId} = ${groups.id} 
            AND ${groupTransactionParticipants.payerUserId} = ${userId}
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
          )
          -
          (SELECT COALESCE(SUM(${groupTransactionParticipants.amount}), 0)
          FROM ${groupTransactionParticipants}
          JOIN ${groupTransactions} ON ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
          WHERE ${groupTransactionParticipants.groupId} = ${groups.id} 
            AND ${groupTransactionParticipants.userId} = ${userId}
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
          )
        ), 0) AS integer) AS balance
      FROM ${groups}
      LEFT JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId}
      WHERE ${groupMembers.userId} = ${userId}
      ORDER BY ${groups.createdAt} DESC;
    `
    const { rows } = await this.drizzleService.execute(query)
    return rows as GetGroupsOutputDto
  }
}
