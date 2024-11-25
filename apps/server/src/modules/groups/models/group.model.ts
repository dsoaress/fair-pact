import type { Model } from '@/core/base/model'
import type { IdValueObject } from '@/core/value-objects/id.value-object'
import type { CurrencyDTO } from '../dtos/currency.dto'

export interface GroupModel extends Model {
  name: string
  currency: CurrencyDTO
  members: IdValueObject[]
}
