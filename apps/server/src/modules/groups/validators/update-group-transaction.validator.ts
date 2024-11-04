import { idValidator } from '@/shared/validators/id.validator'

import { baseCreateGroupTransactionValidator } from './create-group-transaction.validator'

export const updateGroupTransactionValidator = baseCreateGroupTransactionValidator
  .partial()
  .extend({
    id: idValidator,
    groupId: idValidator,
    userId: idValidator
  })
  .refine(({ amount, participants }) => {
    if (!amount || !participants) return true
    const totalParticipantsAmount = participants.reduce((acc, p) => acc + p.amount, 0)
    return participants.length > 0 ? totalParticipantsAmount === amount : true
  }, 'The sum of the participants amount must be equal to the transaction amount')
