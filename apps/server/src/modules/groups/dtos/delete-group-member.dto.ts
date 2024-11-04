import type { z } from 'zod'

import type { deleteGroupMemberValidator } from '../validators/delete-group-member.validator'

export type DeleteGroupMemberDto = z.infer<typeof deleteGroupMemberValidator>
