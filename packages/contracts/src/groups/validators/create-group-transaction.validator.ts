import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

import { amountValidator, amountValidatorErrorMessage } from './amount.validator'

export const baseCreateGroupTransactionValidator = z
  .object({
    name: z.string().min(3).max(255),
    amount: z.number().int(),
    groupId: idValidator,
    payerUserId: idValidator,
    participants: z
      .object({
        userId: idValidator,
        amount: z.number().int()
      })
      .array()
      .min(1),
    date: z.coerce.date(),
    createdBy: idValidator
  })
  .strict()

export const createGroupTransactionValidator = baseCreateGroupTransactionValidator.refine(
  amountValidator,
  amountValidatorErrorMessage
)
