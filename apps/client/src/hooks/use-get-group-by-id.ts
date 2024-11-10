import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import type { GetGroupByIdOutputDto } from 'contracts'

import { queryKeys } from '@/constants/query-keys'
import { getGroupById } from '@/services/get-group-by-id'

export function useGetGroupById(): UseQueryResult<GetGroupByIdOutputDto> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [queryKeys.GROUPS, groupId],
    queryFn: (): Promise<GetGroupByIdOutputDto> => getGroupById(groupId),
    initialData: null
  })
}
