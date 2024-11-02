import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const deleteGroupValidator = z.object({
  id: idValidator
})
