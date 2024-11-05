import { z } from 'zod'

import { idValidator } from '@/shared/validators/id.validator'

import { amountValidator, amountValidatorErrorMessage } from '../utils/amount-validator'

export const baseCreateGroupTransactionValidator = z
  .object({
    name: z.string().min(3).max(255),
    amount: z.number().int(),
    groupId: idValidator,
    payerMemberId: idValidator,
    participants: z
      .object({
        memberId: idValidator,
        amount: z.number().int()
      })
      .array()
      .min(1),
    createdBy: idValidator
  })
  .strict()

export const createGroupTransactionValidator = baseCreateGroupTransactionValidator.refine(
  amountValidator,
  amountValidatorErrorMessage
)
