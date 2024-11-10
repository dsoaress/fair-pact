import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query'
import type { GetGroupByIdOutputDto, GetGroupsOutputDto } from 'contracts'

import { queryKeys } from '@/constants/query-keys'
import { getGroupById } from '@/services/get-group-by-id'
import { getGroups } from '@/services/get-groups'

export function useGetGroups(): UseQueryResult<GetGroupsOutputDto> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [queryKeys.GROUPS],
    queryFn: getGroups,
    initialData: [],
    select(data): GetGroupsOutputDto {
      const groupIds = data.map(group => group.id)
      for (const groupId of groupIds) {
        queryClient.prefetchQuery({
          queryKey: [queryKeys.GROUPS, groupId],
          queryFn: (): Promise<GetGroupByIdOutputDto> => getGroupById(groupId)
        })
      }

      return data
    }
  })
}
