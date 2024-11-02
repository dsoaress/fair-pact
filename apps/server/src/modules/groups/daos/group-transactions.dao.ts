import type { GetGroupTransactionByIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-transaction-by-id-input.dto'
import type { GetGroupTransactionByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transaction-by-id-output.dto'
import type { GetGroupTransactionsByGroupIdInputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-output.dto'
import { sql } from 'drizzle-orm'

import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '@/infra/database/drizzle/schemas'

export class GroupTransactionsDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getGroupTransactionById({
    id,
    userId
  }: GetGroupTransactionByIdInputDto): Promise<GetGroupTransactionByIdOutputDto | null> {
    const query = sql`
      SELECT ${groupTransactions.id}, ${groupTransactions.name}, ${groups.currency}, ${groupTransactions.amount},
        jsonb_build_object(
          'userId', payer.id, 
          'firstName', payer.first_name, 
          'lastName', payer.last_name,
          'amount', 
            COALESCE(SUM(
              CASE 
                WHEN ${groupTransactionParticipants.userId} = payer.id THEN ${groupTransactionParticipants.amount}
                ELSE 0 
              END), 
            0)
        ) AS payer,
        jsonb_agg(
          jsonb_build_object(
            'userId', ${groupTransactionParticipants.userId}, 'amount', ${groupTransactionParticipants.amount}, 'firstName', ${users.firstName}, 'lastName', ${users.lastName}
          )
        ) AS participants,
        ${groupTransactions.date}
      FROM ${groupTransactions}
      JOIN ${groups} ON ${groupTransactions.groupId} = ${groups.id}
      JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId} AND ${groupMembers.userId} = ${userId}
      JOIN ${users} AS payer ON ${groupTransactions.payerUserId} = payer.id
      JOIN ${groupTransactionParticipants} ON ${groupTransactions.id} = ${groupTransactionParticipants.groupTransactionId}
      JOIN ${users} ON ${groupTransactionParticipants.userId} = ${users.id}
      WHERE ${groupTransactions.id} = ${id} 
        AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW()) 
        AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
      GROUP BY ${groupTransactions.id}, ${groups.currency}, payer.id, payer.first_name, payer.last_name;
    `
    const { rows } = await this.drizzleService.execute(query)
    if (rows.length === 0) return null
    return rows[0] as GetGroupTransactionByIdOutputDto
  }

  async getGroupTransactionsByGroupId({
    groupId,
    userId
  }: GetGroupTransactionsByGroupIdInputDto): Promise<GetGroupTransactionsByGroupIdOutputDto> {
    const query = sql`
      SELECT 
        ${groupTransactions.id}, 
        ${groupTransactions.name}, 
        ${groups.currency},
        ${groupTransactions.amount},
        (
          SELECT 
            CASE 
              WHEN ${groupTransactions.payerUserId} = ${userId} THEN amount 
              ELSE -amount 
            END
          FROM ${groupTransactionParticipants} 
          WHERE ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
            AND ${groupTransactionParticipants.userId} = ${userId}
        ) AS contribution,
        jsonb_build_object(
          'userId', payer.id, 
          'firstName', payer.first_name, 
          'lastName', payer.last_name,
          'amount', (
            SELECT amount 
            FROM ${groupTransactionParticipants} 
            WHERE ${groupTransactionParticipants.groupTransactionId} = ${groupTransactions.id}
              AND ${groupTransactionParticipants.userId} = payer.id
          )
        ) AS payer,
        group_transactions.date
      FROM group_transactions
      JOIN ${groups} ON ${groupTransactions.groupId} = ${groups.id}
      JOIN ${groupMembers} ON ${groups.id} = ${groupMembers.groupId} AND ${groupMembers.userId} = ${userId}
      JOIN ${users} AS payer ON ${groupTransactions.payerUserId} = payer.id
      WHERE ${groups.id} = ${groupId} 
        AND EXTRACT(YEAR FROM ${groupTransactions.date}) = EXTRACT(YEAR FROM NOW()) 
        AND EXTRACT(MONTH FROM ${groupTransactions.date}) = EXTRACT(MONTH FROM NOW())
      GROUP BY ${groupTransactions.id}, ${groups.currency}, payer.id, payer.first_name, payer.last_name
      ORDER BY ${groupTransactions.date} DESC;
    `
    const { rows } = await this.drizzleService.execute(query)
    return rows as GetGroupTransactionsByGroupIdOutputDto
  }
}
