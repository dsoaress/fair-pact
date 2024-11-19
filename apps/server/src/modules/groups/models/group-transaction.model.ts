import type { IdValueObject } from 'contracts'

import type { Model } from '@/shared/base/model'

export interface GroupTransactionModel extends Model {
  name: string
  amount: number
  groupId: IdValueObject
  payerMemberId: IdValueObject
  participants: {
    memberId: IdValueObject
    amount: number
  }[]
  date: Date
}
