import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const removeGroupMemberValidator = z.object({
  id: idValidator,
  memberId: idValidator
})
