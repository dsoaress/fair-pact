import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const deleteGroupTransactionValidator = z.object({
  id: idValidator
})
