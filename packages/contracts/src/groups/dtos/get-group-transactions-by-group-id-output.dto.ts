export type GetGroupTransactionsByGroupIdOutputDTO = {
  id: string
  name: string
  currency: string
  amount: number
  contribution: number
  payer: {
    userId: string
    amount: number
    firstName: string
    lastName: string
  }
  date: Date
}[]
