import request from 'supertest'

import { type HttpServer, httpStatusCode } from '@/core/base/http-server'
import { serverModule } from '@/infra/server.module'

import { drizzleService } from '@/infra/database/drizzle/drizzle.service'
import * as schemas from '@/infra/database/drizzle/schemas'
import { data } from '@/infra/database/drizzle/seed/data'

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTNiNWVmZS05ZWUxLTRiNjMtOTE3ZS1jZTc0MzEyYmE5M2MiLCJpYXQiOjE5MjA1MTQ1MzV9.KP9XaFC0Aw1rk3IDYkS0G_KoYkZ6uAJU56tHdp5X_jA'

describe('[E2E] GroupsController', () => {
  let server: HttpServer

  beforeAll(async () => {
    server = serverModule()
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  describe('GET /groups', () => {
    it('should return an error 401 if the user is not authenticated', async () => {
      const response = await request(server.getRawServer()).get('/groups')
      expect(response.status).toBe(httpStatusCode.UNAUTHORIZED)
    })

    it('should return an empty array if the user is authenticated but there are no groups', async () => {
      const response = await request(server.getRawServer())
        .get('/groups')
        .set('Authorization', token)
      expect(response.status).toBe(httpStatusCode.OK)
      expect(response.body?.data).toEqual([])
    })

    it('should return a list of groups if the user is authenticated and there are groups', async () => {
      const {
        groupMembersData,
        groupTransactionParticipantsData,
        groupTransactionsData,
        groupsData,
        usersData
      } = data({
        usersCount: 5,
        groupsCount: 1,
        transactionsPerUserPerGroup: 1
      })

      await drizzleService.transaction(async tx => {
        await tx.insert(schemas.users).values(usersData)
        await tx.insert(schemas.groups).values(groupsData)
        await tx.insert(schemas.groupMembers).values(groupMembersData)
        await tx.insert(schemas.groupTransactions).values(groupTransactionsData)
        await tx
          .insert(schemas.groupTransactionParticipants)
          .values(groupTransactionParticipantsData)
      })

      const response = await request(server.getRawServer())
        .get('/groups')
        .set('Authorization', token)
      expect(response.status).toBe(httpStatusCode.OK)
      expect(response.body?.data).toHaveLength(1)
    })
  })
})
