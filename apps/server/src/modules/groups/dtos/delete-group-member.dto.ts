import { z } from 'zod'

export const DeleteGroupMemberSchema = z.object({
  groupId: z.string(),
  userId: z.string()
})

export type DeleteGroupMemberDto = z.infer<typeof DeleteGroupMemberSchema>
