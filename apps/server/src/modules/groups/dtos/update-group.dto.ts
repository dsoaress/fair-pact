import type { z } from 'zod'

import type { updateGroupValidator } from '../validators/update-group.validator'

export type UpdateGroupDto = z.infer<typeof updateGroupValidator>
