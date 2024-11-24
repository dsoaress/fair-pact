import { type DefinedUseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query'

import type { GetGroupByIdOutputDTO } from '~/get-group-by-id-output.dto'
import type { GetGroupsOutputDTO } from '~/get-groups-output.dto'

import { queryKeys } from '@/constants/query-keys'
import { getGroupById } from '@/containers/groups/services/get-group-by-id'
import { getGroups } from '@/services/get-groups'

type UseGetGroupsOutput = {
  groups: GetGroupsOutputDTO
  userBalance: [string, number][]
}

export function useGetGroups(): DefinedUseQueryResult<UseGetGroupsOutput, Error> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [queryKeys.GROUPS],
    queryFn: getGroups,
    initialData: [],
    select(data): UseGetGroupsOutput {
      const groupIds = data.map(group => group.id)
      for (const groupId of groupIds) {
        queryClient.prefetchQuery({
          queryKey: [queryKeys.GROUPS, groupId],
          queryFn: (): Promise<GetGroupByIdOutputDTO> => getGroupById(groupId)
        })
      }

      const userBalance = data.reduce<Record<string, number>>((acc, group) => {
        const currency = group.currency
        if (!acc[currency]) acc[currency] = 0
        acc[currency] += group.balance
        return acc
      }, {})

      return {
        groups: data,
        userBalance: Object.entries(userBalance)
      }
    }
  })
}
