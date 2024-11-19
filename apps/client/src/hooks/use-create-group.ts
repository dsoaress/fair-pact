import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { CreateGroupOutputDTO } from 'contracts'
import { toast } from 'sonner'

import { queryKeys } from '@/constants/query-keys'
import { type CreateGroupProps, createGroup } from '@/services/create-group'

export function useCreateGroup(): UseMutationResult<CreateGroupOutputDTO, Error, CreateGroupProps> {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createGroup,
    onSuccess: async (data): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.GROUPS] })
      navigate({
        to: '/$group-id',
        params: { 'group-id': data.id }
      })
    },
    onError: (error: Error): void => {
      console.error(error)
      toast.error('Ocorreu um erro ao criar o grupo.', {
        id: 'create-group-error',
        description: 'Por favor, tente novamente.'
      })
    }
  })
}
