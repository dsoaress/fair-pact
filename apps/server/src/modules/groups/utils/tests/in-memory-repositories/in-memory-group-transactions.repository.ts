import type { GroupTransactionModel } from '@/modules/groups/models/group-transaction.model'
import { GroupTransactionsRepository } from '@/modules/groups/repositories/group-transactions.repository'

export class InMemoryGroupTransactionsRepository extends GroupTransactionsRepository {
  constructor(private readonly groupTransactions: GroupTransactionModel[] = []) {
    super({} as never)
  }

  override async findById(id: string): Promise<GroupTransactionModel | null> {
    return this.groupTransactions.find(groupTransaction => groupTransaction.id.value === id) || null
  }

  override async create(model: GroupTransactionModel): Promise<void> {
    this.groupTransactions.push(model)
  }

  override async update(model: GroupTransactionModel): Promise<void> {
    const index = this.groupTransactions.findIndex(
      groupTransaction => groupTransaction.id.value === model.id.value
    )
    this.groupTransactions[index] = model
  }

  override async delete(id: string): Promise<void> {
    const index = this.groupTransactions.findIndex(
      groupTransaction => groupTransaction.id.value === id
    )
    this.groupTransactions.splice(index, 1)
  }
}
