import type { FastifyInstance } from 'fastify'

import { groupsFactory } from './groups.factory'

export function groupsRoutes(app: FastifyInstance): void {
  const { groupsController, groupTransactionsController } = groupsFactory()
  const {
    createGroup,
    deleteGroup,
    getGroupById,
    getGroups,
    updateGroup,
    joinGroup,
    leaveGroup,
    removeGroupMember
  } = groupsController
  const {
    createGroupTransaction,
    deleteGroupTransaction,
    updateGroupTransaction,
    getGroupTransactionById,
    getGroupTransactionsByGroupId
  } = groupTransactionsController

  app.get('/', getGroups.bind(groupsController))
  app.get('/:groupId', getGroupById.bind(groupsController))
  app.post('/', createGroup.bind(groupsController))
  app.post('/:groupId/join-group', joinGroup.bind(groupsController))
  app.post('/:groupId/leave-group', leaveGroup.bind(groupsController))
  app.post('/:groupId/remove-group-member', removeGroupMember.bind(groupsController))
  app.patch('/:groupId', updateGroup.bind(groupsController))
  app.delete('/:groupId', deleteGroup.bind(groupsController))

  app.get('/:groupId/transactions', getGroupTransactionsByGroupId.bind(groupTransactionsController))
  app.get(
    '/:groupId/transactions/:groupTransactionId',
    getGroupTransactionById.bind(groupTransactionsController)
  )
  app.post('/:groupId/transactions', createGroupTransaction.bind(groupTransactionsController))
  app.patch(
    '/:groupId/transactions/:groupTransactionId',
    updateGroupTransaction.bind(groupTransactionsController)
  )
  app.delete(
    '/:groupId/transactions/:groupTransactionId',
    deleteGroupTransaction.bind(groupTransactionsController)
  )
}
