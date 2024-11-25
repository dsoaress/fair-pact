import type { Repository } from '@/core/base/repository'

import type { GroupTransactionModel } from '../models/group-transaction.model'

export interface GroupTransactionsRepository extends Repository<GroupTransactionModel> {
  findById(id: string): Promise<GroupTransactionModel | null>
  create(model: GroupTransactionModel): Promise<void>
  update(model: GroupTransactionModel): Promise<void>
  delete(id: string): Promise<void>
}
