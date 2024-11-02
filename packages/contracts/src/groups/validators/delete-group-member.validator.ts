import { z } from 'zod'
import { idValidator } from '../../shared/validators/id.validator'

export const deleteGroupMemberValidator = z.object({
  id: idValidator
})
