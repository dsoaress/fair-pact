export type GetGroupByIdOutputDTO = {
  id: string
  name: string
  currency: string
  balance: {
    userId: string
    firstName: string
    lastName: string
    amount: number
  }[]
}
