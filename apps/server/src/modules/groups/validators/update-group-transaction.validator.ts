import { idValidator } from '@/shared/validators/id.validator'

import { baseCreateGroupTransactionValidator } from './create-group-transaction.validator'

import { amountValidator, amountValidatorErrorMessage } from '../utils/amount-validator'

export const updateGroupTransactionValidator = baseCreateGroupTransactionValidator
  .partial()
  .omit({
    createdBy: true
  })
  .extend({
    id: idValidator,
    groupId: idValidator,
    userId: idValidator
  })
  .refine(amountValidator, amountValidatorErrorMessage)
