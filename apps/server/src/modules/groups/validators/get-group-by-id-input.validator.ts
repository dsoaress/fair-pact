import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const getGroupByIdInputValidator = z.object({
  id: idValidator,
  memberId: idValidator
})
