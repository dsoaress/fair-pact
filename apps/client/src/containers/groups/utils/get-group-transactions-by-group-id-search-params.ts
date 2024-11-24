import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

export const getGroupTransactionsByGroupIdSearchParams = z.object({
  search: z.string().optional(),
  page: fallback(z.number().int().positive(), 1).default(1),
  'per-page': fallback(z.number().int().positive(), 20).default(20),
  order: fallback(z.enum(['date', 'name', 'amount']), 'date').default('date'),
  dir: fallback(z.enum(['asc', 'desc']), 'desc').default('desc')
})

export type GetGroupTransactionsByGroupIdSearchParams = z.infer<
  typeof getGroupTransactionsByGroupIdSearchParams
>
