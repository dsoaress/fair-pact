import type { z } from 'zod'

import type { getGroupsInputValidator } from '../validators/get-groups-input.validator'

export type GetGroupsInputDto = z.infer<typeof getGroupsInputValidator>
