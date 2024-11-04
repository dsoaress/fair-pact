import type { z } from 'zod'

import type { currencyValidator } from '../validators/currency.validator'

export type CurrencyDto = z.infer<typeof currencyValidator>
