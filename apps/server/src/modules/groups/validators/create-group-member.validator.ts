import { z } from 'zod'

export const createGroupMemberValidator = z.object({
  groupId: z.string(),
  userId: z.string()
})
