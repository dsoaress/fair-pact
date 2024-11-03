import { z } from 'zod'

export const CreateGroupSchema = z.object({
  name: z.string().min(3).max(255),
  createdBy: z.string()
})

export type CreateGroupDto = z.infer<typeof CreateGroupSchema>
