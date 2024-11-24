import { z } from 'zod'

export const idValidator = z.string().uuid()
