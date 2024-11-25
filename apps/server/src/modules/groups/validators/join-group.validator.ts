import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const joinGroupValidator = z.object({
  id: idValidator,
  memberId: idValidator
})
