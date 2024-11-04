import type { z } from 'zod'

import type { createGroupMemberValidator } from '../validators/create-group-member.validator'

export type CreateGroupMemberDto = z.infer<typeof createGroupMemberValidator>
