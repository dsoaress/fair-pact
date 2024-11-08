import type { FastifyInstance } from 'fastify'

import { groupsFactory } from './groups.factory'

export function groupsRoutes(app: FastifyInstance): void {
  const { groupsController, groupMembersController, groupTransactionsController } = groupsFactory()
  const { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } = groupsController
  const { createGroupMember, deleteGroupMember } = groupMembersController
  const {
    createGroupTransaction,
    deleteGroupTransaction,
    updateGroupTransaction,
    getGroupTransactionById,
    getGroupTransactionsByGroupId
  } = groupTransactionsController

  app.get('/', getGroups.bind(groupsController))
  app.get('/:id', getGroupById.bind(groupsController))
  app.post('/', createGroup.bind(groupsController))
  app.patch('/:id', updateGroup.bind(groupsController))
  app.delete('/:id', deleteGroup.bind(groupsController))

  app.post('/:groupId/members', createGroupMember.bind(groupMembersController))
  app.delete('/:groupId/members', deleteGroupMember.bind(groupMembersController))

  app.get('/:groupId/transactions', getGroupTransactionsByGroupId.bind(groupTransactionsController))
  app.get('/:groupId/transactions/:id', getGroupTransactionById.bind(groupTransactionsController))
  app.post('/:groupId/transactions', createGroupTransaction.bind(groupTransactionsController))
  app.patch('/:groupId/transactions/:id', updateGroupTransaction.bind(groupTransactionsController))
  app.delete('/:groupId/transactions/:id', deleteGroupTransaction.bind(groupTransactionsController))
}
