type Participant = {
  memberId: string
  amount: number
  firstName: string
  lastName: string
}

export type GetGroupTransactionByIdOutputDTO = {
  id: string
  name: string
  currency: string
  amount: number
  payer: Participant
  participants: Participant[]
  date: Date
}
