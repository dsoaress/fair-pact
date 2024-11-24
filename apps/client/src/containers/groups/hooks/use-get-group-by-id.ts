import type { GetGroupByIdOutputDTO } from '~/get-group-by-id-output.dto'

import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { queryKeys } from '@/constants/query-keys'
import { getGroupById } from '../services/get-group-by-id'

export function useGetGroupById(): UseQueryResult<GetGroupByIdOutputDTO> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [queryKeys.GROUPS, groupId],
    queryFn: (): Promise<GetGroupByIdOutputDTO> => getGroupById(groupId)
  })
}
