import { drizzle } from 'drizzle-orm/node-postgres'

import { connection } from '../drizzle.service'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups,
  users
} from '../schemas'
import { data } from './data'

const USERS_COUNT = 5
const GROUPS_PER_USER = 2
const GROUPS_COUNT = USERS_COUNT * GROUPS_PER_USER
const TRANSACTIONS_PER_USER_PER_GROUP = 20

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

drizzle(connection)
  .transaction(async tx => {
    await tx.delete(users)
    await tx.insert(users).values(usersData)
    await tx.insert(groups).values(groupsData)
    await tx.insert(groupMembers).values(groupMembersData)
    await tx.insert(groupTransactions).values(groupTransactionsData)
    await tx.insert(groupTransactionParticipants).values(groupTransactionParticipantsData)
  })
  .then(() => {
    console.log(
      `Seed completed, created ${USERS_COUNT} users, ${GROUPS_COUNT} groups and ${
        GROUPS_COUNT * TRANSACTIONS_PER_USER_PER_GROUP
      } transactions`
    )
    process.exit(0)
  })
  .catch(console.error)
