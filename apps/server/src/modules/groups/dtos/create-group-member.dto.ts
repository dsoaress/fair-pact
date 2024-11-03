import { z } from 'zod'

export const CreateGroupMemberSchema = z.object({
  groupId: z.string(),
  userId: z.string()
})

export type CreateGroupMemberDto = z.infer<typeof CreateGroupMemberSchema>
