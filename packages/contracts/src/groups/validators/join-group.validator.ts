import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const joinGroupValidator = z.object({
  id: idValidator,
  userId: idValidator
})
