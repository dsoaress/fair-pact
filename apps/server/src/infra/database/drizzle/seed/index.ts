import { env } from '@/infra/config/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../schemas'
import { data } from './data'

const USERS_COUNT = 5
const GROUPS_PER_USER = 2
const GROUPS_COUNT = USERS_COUNT * GROUPS_PER_USER
const TRANSACTIONS_PER_USER_PER_GROUP = 70

const {
  groupMembersData,
  groupTransactionParticipantsData,
  groupTransactionsData,
  groupsData,
  usersData
} = data({
  usersCount: USERS_COUNT,
  groupsCount: GROUPS_COUNT,
  transactionsPerUserPerGroup: TRANSACTIONS_PER_USER_PER_GROUP
})

drizzle({ connection: env.DATABASE_URL, schema })
  .transaction(async tx => {
    await tx.delete(schema.users)
    await tx.insert(schema.users).values(usersData)
    await tx.insert(schema.groups).values(groupsData)
    await tx.insert(schema.groupMembers).values(groupMembersData)
    await tx.insert(schema.groupTransactions).values(groupTransactionsData)
    await tx.insert(schema.groupTransactionParticipants).values(groupTransactionParticipantsData)
  })
  .then(() => {
    console.info(
      `Seed completed, created ${USERS_COUNT} users, ${GROUPS_COUNT} groups and ${
        GROUPS_COUNT * TRANSACTIONS_PER_USER_PER_GROUP
      } transactions`
    )
    process.exit(0)
  })
  .catch(console.error)
