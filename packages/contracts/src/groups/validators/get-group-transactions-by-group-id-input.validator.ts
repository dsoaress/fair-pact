import { z } from 'zod'
import { idValidator } from '../../shared/validators/id.validator'
import { paginationParamsValidator } from './pagination-params.validator'

export const getGroupTransactionsByGroupIdInputValidator = paginationParamsValidator.extend({
  groupId: idValidator,
  memberId: idValidator,
  search: z.string().optional().nullable(),
  order: z.enum(['date', 'name', 'amount']),
  dir: z.enum(['asc', 'desc'])
})
