import { z } from 'zod'

export const CreateGroupSchema = z.object({
  name: z.string().min(3).max(255),
  members: z.array(z.string()).min(1)
})

export type CreateGroupDto = z.infer<typeof CreateGroupSchema>
