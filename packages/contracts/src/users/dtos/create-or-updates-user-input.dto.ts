import type { z } from 'zod'

import type { createOrUpdateUserValidator } from '../validators/create-or-updates-user.validator'

export type CreateOrUpdateUserInputDto = z.infer<typeof createOrUpdateUserValidator>
