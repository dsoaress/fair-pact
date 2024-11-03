import { z } from 'zod'

import { CreateGroupSchema } from './create-group.dto'

export const UpdateGroupSchema = z.object({
  id: z.string(),
  name: CreateGroupSchema.shape.name.optional(),
  updatedBy: z.string()
})

export type UpdateGroupDto = z.infer<typeof UpdateGroupSchema>
