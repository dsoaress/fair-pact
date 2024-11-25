import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const removeGroupMemberValidator = z.object({
  id: idValidator,
  memberId: idValidator
})
