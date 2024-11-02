import type { z } from 'zod'

import type { getGroupByIdInputValidator } from '../validators/get-group-by-id-input.validator'

export type GetGroupByIdInputDto = z.infer<typeof getGroupByIdInputValidator>
