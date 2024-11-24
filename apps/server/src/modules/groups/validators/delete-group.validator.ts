import { idValidator } from '@/shared/validators/id.validator'
import { z } from 'zod'

export const deleteGroupValidator = z.object({
  id: idValidator
})
