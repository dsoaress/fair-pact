import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

export interface GroupModel extends Model {
  name: string
  members: IdValueObject[]
}
