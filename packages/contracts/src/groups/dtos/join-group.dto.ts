import type { z } from 'zod'

import type { joinGroupValidator } from '../validators/join-group.validator'

export type JoinGroupDTO = z.infer<typeof joinGroupValidator>
