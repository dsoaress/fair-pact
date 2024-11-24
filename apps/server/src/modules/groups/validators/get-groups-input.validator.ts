import { idValidator } from '@/shared/validators/id.validator'
import { z } from 'zod'

export const getGroupsInputValidator = z.object({
  memberId: idValidator
})
