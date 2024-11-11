import type { GetGroupTransactionByIdOutputDTO } from 'contracts'

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
