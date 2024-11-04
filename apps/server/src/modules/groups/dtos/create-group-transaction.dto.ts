import type { z } from 'zod'

import type { createGroupTransactionValidator } from '../validators/create-group-transaction.validator'

export type CreateGroupTransactionDto = z.infer<typeof createGroupTransactionValidator>
