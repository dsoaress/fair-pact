import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/constants/query-keys'
import { type CreateGroupProps, createGroup } from '@/services/create-group'

export function useCreateGroup(): UseMutationResult<void, Error, CreateGroupProps> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GROUPS] })
    },
    onError: (error: Error): void => {
      console.error(error)
    }
  })
}
