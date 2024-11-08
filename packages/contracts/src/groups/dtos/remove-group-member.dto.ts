import type { z } from 'zod'

import type { removeGroupMemberValidator } from '../validators/remove-group-member.validator'

export type RemoveGroupMemberDto = z.infer<typeof removeGroupMemberValidator>
