import { z } from 'zod'

export const createOrUpdateUserValidator = z.object({
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  email: z.string().email(),
  avatar: z.string().optional()
})
