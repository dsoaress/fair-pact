import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const getGroupTransactionByIdInputValidator = z.object({
  id: idValidator,
  userId: idValidator
})
