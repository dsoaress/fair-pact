import type { z } from 'zod'

import type { getGroupsInputValidator } from '../validators/get-groups-input.validator'

export type GetGroupsInputDTO = z.infer<typeof getGroupsInputValidator>
