import type { FastifyInstance } from 'fastify'

import type { CreateGroupMemberDto } from '@/modules/groups/dtos/create-group-member.dto'
import type { CreateGroupTransactionDto } from '@/modules/groups/dtos/create-group-transaction.dto'
import type { CreateGroupDto } from '@/modules/groups/dtos/create-group.dto'
import type { UpdateGroupTransactionDto } from '@/modules/groups/dtos/update-group-transaction.dto'
import type { UpdateGroupDto } from '@/modules/groups/dtos/update-group.dto'
import { groupMembersFactory } from '@/modules/groups/factories/group-members.factory'
import { groupTransactionsFactory } from '@/modules/groups/factories/group-transactions.factory'
import { groupsFactory } from '@/modules/groups/factories/groups.factory'
import { DrizzleGroupMembersRepository } from '../database/drizzle/repositories/groups/drizzle-group-members.repository'
import { DrizzleGroupTransactionsRepository } from '../database/drizzle/repositories/groups/drizzle-group-transaction.repository'
import { DrizzleGroupsRepository } from '../database/drizzle/repositories/groups/drizzle-groups.repository'

export async function groupRoutes(app: FastifyInstance): Promise<void> {
  const groupsRepository = new DrizzleGroupsRepository()
  const groupMembersRepository = new DrizzleGroupMembersRepository()
  const groupTransactionsRepository = new DrizzleGroupTransactionsRepository()
  const groupsController = groupsFactory(groupsRepository)
  const groupMembersController = groupMembersFactory(groupsRepository, groupMembersRepository)
  const groupTransactionsController = groupTransactionsFactory(
    groupsRepository,
    groupMembersRepository,
    groupTransactionsRepository
  )

  app.post<{ Body: Pick<CreateGroupDto, 'name' | 'currency'> }>(
    '/groups',
    async (request, reply) => {
      const data = request.body
      const { statusCode } = await groupsController.createGroup({
        ...data,
        createdBy: 'vjczf65fzbghg79eclf86q4n'
      })
      reply.status(statusCode).send()
    }
  )

  app.patch<{ Body: Pick<UpdateGroupDto, 'name' | 'currency'>; Params: { id: string } }>(
    '/groups/:id',
    async (request, reply) => {
      const data = request.body
      const { id } = request.params
      const { statusCode } = await groupsController.updateGroup({
        ...data,
        id,
        updatedBy: 'vjczf65fzbghg79eclf86q4n'
      })
      reply.status(statusCode).send()
    }
  )

  app.delete<{ Params: { id: string } }>('/groups/:id', async (request, reply) => {
    const { id } = request.params
    const { statusCode } = await groupsController.deleteGroup({
      id,
      userId: 'vjczf65fzbghg79eclf86q4n'
    })
    reply.status(statusCode).send()
  })

  app.post<{ Body: CreateGroupMemberDto }>('/groups/members', async (request, reply) => {
    const data = request.body
    const { statusCode } = await groupMembersController.createGroupMember(data)
    reply.status(statusCode).send()
  })

  app.delete<{ Params: { id: string } }>('/groups/members/:id', async (request, reply) => {
    const { id } = request.params
    const { statusCode } = await groupMembersController.deleteGroupMember({ id })
    reply.status(statusCode).send()
  })

  app.post<{ Body: CreateGroupTransactionDto }>('/groups/transactions', async (request, reply) => {
    const data = request.body
    const { statusCode } = await groupTransactionsController.createGroupTransection(data)
    reply.status(statusCode).send()
  })

  app.patch<{ Body: UpdateGroupTransactionDto; Params: { id: string } }>(
    '/groups/transactions/:id',
    async (request, reply) => {
      const data = request.body
      const { id } = request.params
      const { statusCode } = await groupTransactionsController.updateGroupTransection({
        ...data,
        id
      })
      reply.status(statusCode).send()
    }
  )

  app.delete<{ Params: { id: string; groupId: string } }>(
    '/groups/:groupId/transactions/:id',
    async (request, reply) => {
      const { id, groupId } = request.params
      const { statusCode } = await groupTransactionsController.deleteGroupTransection({
        id,
        groupId
      })
      reply.status(statusCode).send()
    }
  )
}
