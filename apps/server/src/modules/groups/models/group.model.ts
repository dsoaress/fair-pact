import type { CurrencyDTO, IdValueObject } from 'contracts'

import type { Model } from '@/shared/base/model'

export interface GroupModel extends Model {
  name: string
  currency: CurrencyDTO
  members: IdValueObject[]
}
