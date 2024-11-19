export type GetGroupByIdOutputDTO = {
  id: string
  name: string
  currency: string
  balance: {
    memberId: string
    firstName: string
    lastName: string
    amount: number
  }[]
}
