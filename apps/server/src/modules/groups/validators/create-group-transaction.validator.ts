import { z } from 'zod'

import { idValidator } from '@/shared/validators/id.validator'

export const baseCreateGroupTransactionValidator = z.object({
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
    .optional(),
  createdBy: idValidator
})

export const createGroupTransactionValidator = baseCreateGroupTransactionValidator.refine(
  ({ amount, participants }) => {
    if (!participants) return true
    const totalParticipantsAmount = participants.reduce((acc, p) => acc + p.amount, 0)
    return participants.length > 0 ? totalParticipantsAmount === amount : true
  },
  'The sum of the participants amount must be equal to the transaction amount'
)
