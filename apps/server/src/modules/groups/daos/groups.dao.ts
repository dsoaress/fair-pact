import type {
  GetGroupByIdInputDTO,
  GetGroupByIdOutputDTO,
  GetGroupsInputDTO,
  GetGroupsOutputDTO
} from 'contracts'

import { and, eq, sql } from 'drizzle-orm'

import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '@/shared/database/drizzle/schemas'

export class GroupsDAO {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupById({
    id,
    memberId
  }: GetGroupByIdInputDTO): Promise<GetGroupByIdOutputDTO | null> {
    const query = sql`
      SELECT 
        ${groups.id}, 
        ${groups.name}, 
        ${groups.currency},
        jsonb_agg(
          jsonb_build_object(
            'memberId', final_balances.other_user_id, 'firstName', ${users.firstName}, 'lastName', ${users.lastName},
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
              WHEN ${groupTransactionParticipants.payerMemberId} = ${memberId} THEN ${groupTransactionParticipants.memberId}
              ELSE ${groupTransactionParticipants.payerMemberId}
            END AS other_user_id,
            CASE 
              WHEN ${groupTransactionParticipants.payerMemberId} = ${memberId} THEN ${groupTransactionParticipants.amount} 
              ELSE - ${groupTransactionParticipants.amount}
            END AS amount
          FROM ${groupTransactionParticipants}
          JOIN ${groupTransactions} ON ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
          WHERE 
            ${groupTransactionParticipants.groupId} = ${groups.id}
            AND (${groupTransactionParticipants.payerMemberId} = ${memberId} OR ${groupTransactionParticipants.memberId} = ${memberId})
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
        ) AS user_balances
        WHERE other_user_id != ${memberId}
        GROUP BY other_user_id
      ) AS final_balances ON TRUE
      JOIN ${users} ON ${users.id} = final_balances.other_user_id
      WHERE ${groups.id} = ${id} AND ${groupMembers.memberId} = ${memberId}
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
        .where(and(eq(groups.id, id), eq(groupMembers.memberId, memberId)))
        .leftJoin(groupMembers, eq(groupMembers.groupId, groups.id))
      if (!result) return null
      return result[0]
    }
    return rows[0] as GetGroupByIdOutputDTO
  }

  async getGroups({ memberId }: GetGroupsInputDTO): Promise<GetGroupsOutputDTO> {
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
            AND ${groupTransactionParticipants.payerMemberId} = ${memberId}
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
          )
          -
          (SELECT COALESCE(SUM(${groupTransactionParticipants.amount}), 0)
          FROM ${groupTransactionParticipants}
          JOIN ${groupTransactions} ON ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
          WHERE ${groupTransactionParticipants.groupId} = ${groups.id} 
            AND ${groupTransactionParticipants.memberId} = ${memberId}
            AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW())
            AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
          )
        ), 0) AS integer) AS balance
      FROM ${groups}
      LEFT JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId}
      WHERE ${groupMembers.memberId} = ${memberId}
      ORDER BY ${groups.createdAt} DESC;
    `
    const { rows } = await this.drizzleService.execute(query)
    return rows as GetGroupsOutputDTO
  }
}
