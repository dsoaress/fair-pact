import type { z } from 'zod'

import type { createOrUpdateUserValidator } from '../validators/create-or-update-user.validator'

export type CreateOrUpdateUserInputDTO = z.infer<typeof createOrUpdateUserValidator>
