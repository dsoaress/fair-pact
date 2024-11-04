import { z } from 'zod'

export const deleteGroupValidator = z.object({
  id: z.string(),
  userId: z.string()
})
