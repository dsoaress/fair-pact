import { z } from 'zod'

export const paginationParamsValidator = z.object({
  page: z
    .string()
    .refine(value => +value > 0, {
      message: 'Page must be greater than 0'
    })
    .transform(value => +value),
  'per-page': z
    .string()
    .refine(value => +value > 0, {
      message: 'Limit must be greater than 0'
    })
    .transform(value => +value)
})
