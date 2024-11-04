import { z } from 'zod'

import { idValidator } from '@/shared/validators/id.validator'

export const deleteGroupTransactionValidator = z.object({
  id: idValidator
})
