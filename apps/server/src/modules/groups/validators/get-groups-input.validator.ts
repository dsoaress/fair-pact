import { idValidator } from '@/core/validators/id.validator'
import { z } from 'zod'

export const getGroupsInputValidator = z.object({
  memberId: idValidator
})
