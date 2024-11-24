import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { GetUserProfileOutputDTO } from '~/get-user-profile-output.dto'

import { queryKeys } from '@/constants/query-keys'
import { getUserProfile } from '@/services/get-user-profile'

export function useGetUserProfile(): UseQueryResult<GetUserProfileOutputDTO> {
  return useQuery({
    queryKey: [queryKeys.USER_PROFILE],
    queryFn: getUserProfile
  })
}
