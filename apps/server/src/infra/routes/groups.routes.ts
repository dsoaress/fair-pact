import { groupsFactory } from '@/modules/groups/groups.factory'
import type { FastifyInstance } from 'fastify'

export function groupsRoutes(app: FastifyInstance): void {
  const { groupRoutes, groupMembersRoutes, groupTransactionsRoutes } = groupsFactory()
  const { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } = groupRoutes
  const { createGroupMember, deleteGroupMember } = groupMembersRoutes
  const {
    createGroupTransaction,
    deleteGroupTransaction,
    updateGroupTransaction,
    getGroupTransactionById,
    getGroupTransactionsByGroupId
  } = groupTransactionsRoutes

  app.get('/', getGroups.bind(groupRoutes))
  app.get('/:id', getGroupById.bind(groupRoutes))
  app.post('/', createGroup.bind(groupRoutes))
  app.patch('/:id', updateGroup.bind(groupRoutes))
  app.delete('/:id', deleteGroup.bind(groupRoutes))

  app.post('/:groupId/members', createGroupMember.bind(groupMembersRoutes))
  app.delete('/:groupId/members', deleteGroupMember.bind(groupMembersRoutes))

  app.get('/:groupId/transactions', getGroupTransactionsByGroupId.bind(groupTransactionsRoutes))
  app.get('/:groupId/transactions/:id', getGroupTransactionById.bind(groupTransactionsRoutes))
  app.post('/:groupId/transactions', createGroupTransaction.bind(groupTransactionsRoutes))
  app.patch('/:groupId/transactions/:id', updateGroupTransaction.bind(groupTransactionsRoutes))
  app.delete('/:groupId/transactions/:id', deleteGroupTransaction.bind(groupTransactionsRoutes))
}
