import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const getGroupTransactionByIdInputValidator = z.object({
  id: idValidator,
  memberId: idValidator
})
