import { baseCreateGroupTransactionValidator } from './create-group-transaction.validator'

import { idValidator } from '@/core/validators/id.validator'
import { amountValidator, amountValidatorErrorMessage } from './amount.validator'

export const updateGroupTransactionValidator = baseCreateGroupTransactionValidator
  .partial()
  .omit({
    createdBy: true
  })
  .extend({
    id: idValidator,
    groupId: idValidator,
    memberId: idValidator
  })
  .refine(amountValidator, amountValidatorErrorMessage)
