import { z } from 'zod'

export const DeleteGroupSchema = z.object({
  id: z.string(),
  userId: z.string()
})

export type DeleteGroupDto = z.infer<typeof DeleteGroupSchema>
