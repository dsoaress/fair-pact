type Input = {
  amount?: number
  participants?: {
    amount: number
  }[]
}

export function amountValidator({ amount, participants }: Input): boolean {
  if (!amount || !participants) return true
  const totalParticipantsAmount = participants.reduce((acc, p) => acc + p.amount, 0)
  return totalParticipantsAmount === amount
}

export const amountValidatorErrorMessage =
  'The sum of the participants amount must be equal to the transaction amount'
