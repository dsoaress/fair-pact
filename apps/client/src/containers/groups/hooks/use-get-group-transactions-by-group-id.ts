import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'

import type { GetGroupTransactionsByGroupIdOutputDTO } from '~/get-group-transactions-by-group-id-output.dto'

import { queryKeys } from '@/constants/query-keys'

import { getGroupTransactionsByGroupId } from '../services/get-group-transactions-by-group-id'

const routeApi = getRouteApi('/$group-id/')

export function useGetGroupTransactionsByGroupId(): UseQueryResult<GetGroupTransactionsByGroupIdOutputDTO> {
  const { 'group-id': groupId } = routeApi.useParams()
  const params = routeApi.useSearch()
  return useQuery({
    queryKey: [queryKeys.GROUPS, queryKeys.GROUP_TRANSACTIONS, groupId, params],
    queryFn: (): Promise<GetGroupTransactionsByGroupIdOutputDTO> =>
      getGroupTransactionsByGroupId(groupId, params)
  })
}
