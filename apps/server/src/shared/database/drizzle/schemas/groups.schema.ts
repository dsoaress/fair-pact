import { relations } from 'drizzle-orm'
import { index, integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { users } from './auth.schema'

export const groups = pgTable('groups', {
  id: uuid().notNull().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  currency: varchar({ length: 3 }).notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'cascade' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 6 })
})

export const groupRelations = relations(groups, ({ many, one }) => ({
  members: many(groupMembers),
  transactions: many(groupTransactions),
  transaction_participants: many(groupTransactionParticipants),
  created_by_user: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
    relationName: 'created_by_user'
  }),
  updated_by_user: one(users, {
    fields: [groups.updatedBy],
    references: [users.id],
    relationName: 'updated_by_user'
  })
}))

export const groupMembers = pgTable(
  'group_members',
  {
    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull()
  },
  t => [primaryKey({ columns: [t.groupId, t.userId] })]
)

export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, { fields: [groupMembers.groupId], references: [groups.id] }),
  user: one(users, { fields: [groupMembers.userId], references: [users.id] })
}))

export const groupTransactions = pgTable(
  'group_transactions',
  {
    id: uuid().notNull().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    amount: integer().notNull(),
    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    payerUserId: uuid('payer_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    date: timestamp('date', { withTimezone: true, precision: 6 }).notNull(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
    updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, precision: 6 })
  },
  t => [index().on(t.groupId)]
)

export const groupTransactionRelations = relations(groupTransactions, ({ many, one }) => ({
  participants: many(groupTransactionParticipants),
  group: one(groups, { fields: [groupTransactions.groupId], references: [groups.id] }),
  payer: one(users, {
    fields: [groupTransactions.payerUserId],
    references: [users.id],
    relationName: 'payer_user'
  }),
  created_by_user: one(users, {
    fields: [groupTransactions.createdBy],
    references: [users.id],
    relationName: 'created_by_user'
  }),
  updated_by_user: one(users, {
    fields: [groupTransactions.updatedBy],
    references: [users.id],
    relationName: 'updated_by_user'
  })
}))

export const groupTransactionParticipants = pgTable(
  'group_transaction_participants',
  {
    groupTransactionId: uuid('group_transaction_id')
      .notNull()
      .references(() => groupTransactions.id, {
        onDelete: 'cascade'
      }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    payerUserId: uuid('payer_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    amount: integer().notNull()
  },
  t => [primaryKey({ columns: [t.groupTransactionId, t.userId] })]
)

export const groupTransactionParticipantRelations = relations(
  groupTransactionParticipants,
  ({ one }) => ({
    transaction: one(groupTransactions, {
      fields: [groupTransactionParticipants.groupTransactionId],
      references: [groupTransactions.id]
    }),
    group: one(groups, { fields: [groupTransactionParticipants.groupId], references: [groups.id] }),
    user: one(users, {
      fields: [groupTransactionParticipants.userId],
      references: [users.id],
      relationName: 'user'
    }),
    payer: one(users, {
      fields: [groupTransactionParticipants.payerUserId],
      references: [users.id],
      relationName: 'payer_user'
    })
  })
)
