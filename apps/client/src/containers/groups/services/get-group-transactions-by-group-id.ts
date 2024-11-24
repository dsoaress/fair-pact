import type { GetGroupTransactionsByGroupIdOutputDTO } from 'contracts'

import { api } from '@/lib/api'

import type { GetGroupTransactionsByGroupIdSearchParams } from '../utils/get-group-transactions-by-group-id-search-params'

export async function getGroupTransactionsByGroupId(
  groupId: string,
  params: GetGroupTransactionsByGroupIdSearchParams
): Promise<GetGroupTransactionsByGroupIdOutputDTO> {
  return api.get(`/groups/${groupId}/transactions`, { params }).then(res => res.data.data)
}
