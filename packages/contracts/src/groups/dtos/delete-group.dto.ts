import type { z } from 'zod'

import type { deleteGroupValidator } from '../validators/delete-group.validator'

export type DeleteGroupDto = z.infer<typeof deleteGroupValidator>
