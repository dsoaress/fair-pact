import type {
  GetGroupTransactionByIdInputDTO,
  GetGroupTransactionByIdOutputDTO,
  GetGroupTransactionsByGroupIdInputDTO,
  GetGroupTransactionsByGroupIdOutputDTO
} from 'contracts'

import { sql } from 'drizzle-orm'

import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '@/shared/database/drizzle/schemas'

export class GroupTransactionsDAO {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupTransactionById({
    id,
    memberId
  }: GetGroupTransactionByIdInputDTO): Promise<GetGroupTransactionByIdOutputDTO | null> {
    const query = sql`
      SELECT ${groupTransactions.id}, ${groupTransactions.name}, ${groups.currency}, ${groupTransactions.amount},
        jsonb_build_object(
          'memberId', payer.id, 
          'firstName', payer.first_name, 
          'lastName', payer.last_name,
          'amount', 
            COALESCE(SUM(
              CASE 
                WHEN ${groupTransactionParticipants.memberId} = payer.id THEN ${groupTransactionParticipants.amount}
                ELSE 0 
              END), 
            0)
        ) AS payer,
        jsonb_agg(
          jsonb_build_object(
            'memberId', ${groupTransactionParticipants.memberId}, 'amount', ${groupTransactionParticipants.amount}, 'firstName', ${users.firstName}, 'lastName', ${users.lastName}
          )
        ) AS participants,
        ${groupTransactions.date}
      FROM ${groupTransactions}
      JOIN ${groups} ON ${groupTransactions.groupId} = ${groups.id}
      JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId} AND ${groupMembers.memberId} = ${memberId}
      JOIN ${users} AS payer ON ${groupTransactions.payerMemberId} = payer.id
      JOIN ${groupTransactionParticipants} ON ${groupTransactions.id} = ${groupTransactionParticipants.groupTransactionId}
      JOIN ${users} ON ${groupTransactionParticipants.memberId} = ${users.id}
      WHERE ${groupTransactions.id} = ${id} 
        AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW()) 
        AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
      GROUP BY ${groupTransactions.id}, ${groups.currency}, payer.id, payer.first_name, payer.last_name;
    `
    const { rows } = await this.drizzleService.execute(query)
    if (rows.length === 0) return null
    return rows[0] as GetGroupTransactionByIdOutputDTO
  }

  async getGroupTransactionsByGroupId({
    groupId,
    memberId
  }: GetGroupTransactionsByGroupIdInputDTO): Promise<GetGroupTransactionsByGroupIdOutputDTO> {
    const query = sql`
      SELECT 
        ${groupTransactions.id}, 
        ${groupTransactions.name}, 
        ${groups.currency},
        ${groupTransactions.amount},
        (
          SELECT 
            CASE 
              WHEN ${groupTransactions.payerMemberId} = ${memberId} THEN amount 
              ELSE -amount 
            END
          FROM ${groupTransactionParticipants} 
          WHERE ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
            AND ${groupTransactionParticipants.memberId} = ${memberId}
        ) AS contribution,
        jsonb_build_object(
          'memberId', payer.id, 
          'firstName', payer.first_name, 
          'lastName', payer.last_name,
          'amount', (
            SELECT amount 
            FROM ${groupTransactionParticipants} 
            WHERE ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
              AND ${groupTransactionParticipants.memberId} = payer.id
          )
        ) AS payer,
        group_transactions.date
      FROM group_transactions
      JOIN ${groups} ON ${groupTransactions.groupId} = ${groups.id}
      JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId} AND ${groupMembers.memberId} = ${memberId}
      JOIN ${users} AS payer ON ${groupTransactions.payerMemberId} = payer.id
      WHERE ${groups.id} = ${groupId} 
        AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW()) 
        AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
      GROUP BY ${groupTransactions.id}, ${groups.currency}, payer.id, payer.first_name, payer.last_name
      ORDER BY ${groupTransactions.date} DESC;
    `
    const { rows } = await this.drizzleService.execute(query)
    return rows as GetGroupTransactionsByGroupIdOutputDTO
  }
}
