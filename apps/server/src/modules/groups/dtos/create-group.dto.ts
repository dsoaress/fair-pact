import type { z } from 'zod'

import type { createGroupValidator } from '../validators/create-group.validator'

export type CreateGroupDto = z.infer<typeof createGroupValidator>
