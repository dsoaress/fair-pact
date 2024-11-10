import type { CurrencyDto, IdValueObject } from 'contracts'

import type { Model } from '@/shared/base/model'

export interface GroupModel extends Model {
  name: string
  currency: CurrencyDto
  members: IdValueObject[]
}
