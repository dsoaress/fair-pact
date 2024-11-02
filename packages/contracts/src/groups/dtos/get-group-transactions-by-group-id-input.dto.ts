import type { z } from 'zod'

import type { getGroupTransactionsByGroupIdInputValidator } from '../validators/get-group-transactions-by-group-id-input.validator'

export type GetGroupTransactionsByGroupIdInputDto = z.infer<
  typeof getGroupTransactionsByGroupIdInputValidator
>
