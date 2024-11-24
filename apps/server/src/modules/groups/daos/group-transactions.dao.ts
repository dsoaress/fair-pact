import type { GetGroupTransactionByIdInputDTO } from '../dtos/get-group-transaction-by-id-input.dto'
import type { GetGroupTransactionByIdOutputDTO } from '../dtos/get-group-transaction-by-id-output.dto'
import type { GetGroupTransactionsByGroupIdInputDTO } from '../dtos/get-group-transactions-by-group-id-input.dto'
import type { GetGroupTransactionsByGroupIdOutputDTO } from '../dtos/get-group-transactions-by-group-id-output.dto'

export interface GroupTransactionsDAO {
  getGroupTransactionById({
    id,
    memberId
  }: GetGroupTransactionByIdInputDTO): Promise<GetGroupTransactionByIdOutputDTO | null>
  getGroupTransactionsByGroupId({
    groupId,
    memberId
  }: GetGroupTransactionsByGroupIdInputDTO): Promise<GetGroupTransactionsByGroupIdOutputDTO>
}
