import { z } from 'zod'

import { currencyValidator } from './currency.validator'

export const createGroupValidator = z.object({
  name: z.string().min(3).max(255),
  currency: currencyValidator,
  createdBy: z.string()
})
