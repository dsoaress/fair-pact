import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

export interface GroupTransactionModel extends Model {
  name: string
  amount: number
  groupId: IdValueObject
  payerMemberId: IdValueObject
  participants: {
    memberId: IdValueObject
    amount: number
  }[]
}
