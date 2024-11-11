import type { z } from 'zod'

import type { deleteGroupTransactionValidator } from '../validators/delete-group-transaction.validator'

export type DeleteGroupTransactionDTO = z.infer<typeof deleteGroupTransactionValidator>
