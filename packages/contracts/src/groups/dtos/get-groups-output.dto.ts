import type { GetGroupByIdOutputDTO } from './get-group-by-id-output.dto'

export type GetGroupsOutputDTO = (GetGroupByIdOutputDTO & {
  balance: number
})[]
