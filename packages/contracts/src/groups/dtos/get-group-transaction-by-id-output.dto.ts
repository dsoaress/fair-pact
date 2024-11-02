type Participant = {
  userId: string
  amount: number
  firstName: string
  lastName: string
}

export type GetGroupTransactionByIdOutputDto = {
  id: string
  name: string
  currency: string
  amount: number
  payer: Participant
  participants: Participant[]
  date: Date
}
