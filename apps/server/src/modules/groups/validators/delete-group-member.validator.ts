import { idValidator } from '@/shared/validators/id.validator'
import { z } from 'zod'

export const deleteGroupMemberValidator = z.object({
  id: idValidator
})
