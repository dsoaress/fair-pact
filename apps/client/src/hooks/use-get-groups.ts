import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/src/groups/dtos/get-group-by-id-output.dto'
import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query'

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
