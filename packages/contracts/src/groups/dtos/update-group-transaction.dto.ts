import type { z } from 'zod'

import type { updateGroupTransactionValidator } from '../validators/update-group-transaction.validator'

export type UpdateGroupTransactionDto = z.infer<typeof updateGroupTransactionValidator>
