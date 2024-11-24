import type { GetGroupTransactionByIdOutputDTO } from '~/get-group-transaction-by-id-output.dto'

import { api } from '@/lib/api'

export async function getGroupTransactionById(
  groupId: string,
  transactionId: string
): Promise<GetGroupTransactionByIdOutputDTO> {
  return api
    .get<{
      data: GetGroupTransactionByIdOutputDTO
    }>(`/groups/${groupId}/transactions/${transactionId}`)
    .then(res => res.data.data)
}
