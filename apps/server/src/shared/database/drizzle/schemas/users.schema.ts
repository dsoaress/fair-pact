import { relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import {
  groupMembers,
  groupTransactionParticipants,
  groupTransactions,
  groups
} from './groups.schema'

export const users = pgTable('users', {
  id: uuid().primaryKey().notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  avatar: varchar({ length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  groups_created_by: many(groups, { relationName: 'created_by_user' }),
  groups_updated_by: many(groups, { relationName: 'updated_by_user' }),
  group_members: many(groupMembers),
  group_transactions_payer: many(groupTransactions, { relationName: 'payer_user' }),
  group_transactions_created_by: many(groupTransactions, { relationName: 'created_by_user' }),
  group_transactions_updated_by: many(groupTransactions, { relationName: 'updated_by_user' }),
  group_transaction_participants_user: many(groupTransactionParticipants, { relationName: 'user' }),
  group_transaction_participants_payer: many(groupTransactionParticipants, {
    relationName: 'payer_user'
  })
}))
