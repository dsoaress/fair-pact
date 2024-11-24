import { z } from 'zod'

export const currencyValidator = z.enum(['USD', 'EUR', 'BRL'])
