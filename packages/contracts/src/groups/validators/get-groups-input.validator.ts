import { z } from 'zod'

import { idValidator } from '../../shared/validators/id.validator'

export const getGroupsInputValidator = z.object({
  memberId: idValidator
})
