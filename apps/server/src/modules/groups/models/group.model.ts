import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { CurrencyDto } from '../dtos/currency.dto'

export interface GroupModel extends Model {
  name: string
  currency: CurrencyDto
  members: IdValueObject[]
}
