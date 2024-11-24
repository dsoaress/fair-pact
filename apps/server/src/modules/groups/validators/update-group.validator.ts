import { z } from 'zod'

import { createGroupValidator } from './create-group.validator'

export const updateGroupValidator = z.object({
  id: z.string(),
  name: createGroupValidator.shape.name.optional(),
  currency: createGroupValidator.shape.currency.optional(),
  updatedBy: z.string()
})
