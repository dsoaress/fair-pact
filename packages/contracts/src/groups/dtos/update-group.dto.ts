import type { z } from 'zod'

import type { updateGroupValidator } from '../validators/update-group.validator'

export type UpdateGroupDTO = z.infer<typeof updateGroupValidator>
