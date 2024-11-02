import type { z } from 'zod'

import { CreateGroupSchema } from './create-group.dto'

export const UpdateGroupSchema = CreateGroupSchema.partial()

export type UpdateGroupDto = z.infer<typeof UpdateGroupSchema>
