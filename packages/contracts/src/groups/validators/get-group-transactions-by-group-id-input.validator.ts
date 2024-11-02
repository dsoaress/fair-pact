import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const getGroupTransactionsByGroupIdInputValidator = z.object({
  groupId: idValidator,
  userId: idValidator
})
