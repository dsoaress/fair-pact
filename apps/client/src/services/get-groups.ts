import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

import { keys } from './keys'

async function getGroups(): Promise<GetGroupsOutputDto> {
  return api.get<{ data: GetGroupsOutputDto }>('/groups').then(res => res.data.data)
}

export function useGetGroups(): UseQueryResult<GetGroupsOutputDto, Error> {
  return useQuery({
    queryKey: [keys.GROUPS],
    queryFn: getGroups,
    initialData: []
  })
}
