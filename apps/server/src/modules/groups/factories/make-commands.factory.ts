import { CreateGroupTransactionCommand } from '../commands/create-group-transaction.command'
import { CreateGroupCommand } from '../commands/create-group.command'
import { DeleteGroupTransactionCommand } from '../commands/delete-group-transaction.command'
import { DeleteGroupCommand } from '../commands/delete-group.command'
import { JoinGroupCommand } from '../commands/join-group.command'
import { RemoveGroupMemberCommand } from '../commands/remove-group-member.command'
import { UpdateGroupTransactionCommand } from '../commands/update-group-transaction.command'
import { UpdateGroupCommand } from '../commands/update-group.command'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import type { GroupsRepository } from '../repositories/groups.repository'

type Input = {
  groupsRepository: GroupsRepository
  groupTransactionsRepository: GroupTransactionsRepository
}

type Output = {
  createGroupCommand: CreateGroupCommand
  addGroupMemberCommand: JoinGroupCommand
  removeGroupMemberCommand: RemoveGroupMemberCommand
  updateGroupCommand: UpdateGroupCommand
  deleteGroupCommand: DeleteGroupCommand
  createGroupTransactionCommand: CreateGroupTransactionCommand
  updateGroupTransactionCommand: UpdateGroupTransactionCommand
  deleteGroupTransactionCommand: DeleteGroupTransactionCommand
}

export function makeCommandsFactory({
  groupsRepository: groups,
  groupTransactionsRepository: groupTransactions
}: Input): Output {
  const createGroupCommand = new CreateGroupCommand(groups)
  const addGroupMemberCommand = new JoinGroupCommand(groups)
  const removeGroupMemberCommand = new RemoveGroupMemberCommand(groups)
  const updateGroupCommand = new UpdateGroupCommand(groups)
  const deleteGroupCommand = new DeleteGroupCommand(groups)
  const createGroupTransactionCommand = new CreateGroupTransactionCommand(groups, groupTransactions)
  const updateGroupTransactionCommand = new UpdateGroupTransactionCommand(groups, groupTransactions)
  const deleteGroupTransactionCommand = new DeleteGroupTransactionCommand(groupTransactions)

  return {
    createGroupCommand,
    addGroupMemberCommand,
    removeGroupMemberCommand,
    updateGroupCommand,
    deleteGroupCommand,
    createGroupTransactionCommand,
    updateGroupTransactionCommand,
    deleteGroupTransactionCommand
  }
}
