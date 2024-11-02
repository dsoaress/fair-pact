import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { api } from '@/lib/api'

import { keys } from './keys'

async function getGroupById(groupId: string): Promise<GetGroupByIdOutputDto> {
  return api.get<{ data: GetGroupByIdOutputDto }>(`/groups/${groupId}`).then(res => res.data.data)
}

export function useGetGroupById(): UseQueryResult<GetGroupByIdOutputDto, Error> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [keys.GROUPS, groupId],
    queryFn: (): Promise<GetGroupByIdOutputDto> => getGroupById(groupId),
    initialData: null
  })
}
