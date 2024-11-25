import { eq, sql } from 'drizzle-orm'

import type { CacheService } from '@/core/base/cache-service'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '@/infra/database/drizzle/schemas'
import type { GroupTransactionsDAO } from '@/modules/groups/daos/group-transactions.dao'
import type { GetGroupTransactionByIdInputDTO } from '@/modules/groups/dtos/get-group-transaction-by-id-input.dto'
import type { GetGroupTransactionByIdOutputDTO } from '@/modules/groups/dtos/get-group-transaction-by-id-output.dto'
import type { GetGroupTransactionsByGroupIdInputDTO } from '@/modules/groups/dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDTO } from '@/modules/groups/dtos/get-group-transactions-by-group-id-output.dto'

export class DrizzleGroupTransactionsDAO implements GroupTransactionsDAO {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly cacheService: CacheService
  ) {}

  async getGroupTransactionById({
    id,
    memberId
  }: GetGroupTransactionByIdInputDTO): Promise<GetGroupTransactionByIdOutputDTO | null> {
    const cache = await this.cacheService.get<GetGroupTransactionByIdOutputDTO>(
      `group-transaction:${id}:${memberId}`
    )
    if (cache) return cache

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

    await this.cacheService.set(`group-transaction:${id}:${memberId}`, rows[0])

    return rows[0] as GetGroupTransactionByIdOutputDTO
  }

  async getGroupTransactionsByGroupId({
    groupId,
    memberId,
    page,
    'per-page': limit,
    order,
    dir,
    search
  }: GetGroupTransactionsByGroupIdInputDTO): Promise<GetGroupTransactionsByGroupIdOutputDTO> {
    const cache = await this.cacheService.get<GetGroupTransactionsByGroupIdOutputDTO>(
      `group-transactions:${groupId}:${memberId}:${page}:${limit}:${order}:${dir}:${search ?? 'without-search'}`
    )
    if (cache) return cache

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
        ${search?.trim() ? sql`AND LOWER(${groupTransactions.name}) LIKE LOWER(%${search}%)` : sql``}
      GROUP BY ${groupTransactions.id}, ${groups.currency}, payer.id, payer.first_name, payer.last_name
      ORDER BY ${groupTransactions[order]} ${dir === 'asc' ? sql`ASC` : sql`DESC`}
      LIMIT ${limit} 
      OFFSET ${(page - 1) * limit};
    `

    const { rows, count } = await this.drizzleService.transaction(async tx => {
      const { rows } = await tx.execute(query)
      const count = await tx.$count(groupTransactions, eq(groupTransactions.groupId, groupId))
      return { rows: rows as GetGroupTransactionsByGroupIdOutputDTO, count }
    })

    console.log('count', count)

    await this.cacheService.set(
      `group-transactions:${groupId}:${memberId}:${page}:${limit}:${order}:${dir}:${search ?? 'without-search'}`,
      rows
    )

    return rows
  }
}
