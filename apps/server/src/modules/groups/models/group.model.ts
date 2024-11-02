import type { CurrencyDto } from '@fair-pact/contracts/groups/dtos/currency.dto'
import type { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { Model } from '@/shared/base/model'

export interface GroupModel extends Model {
  name: string
  currency: CurrencyDto
  members: IdValueObject[]
}
