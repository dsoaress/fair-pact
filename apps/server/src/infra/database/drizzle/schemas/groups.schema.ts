import { relations } from 'drizzle-orm'
import { index, integer, pgTable, timestamp, unique, varchar } from 'drizzle-orm/pg-core'

export const groups = pgTable('groups', {
  id: varchar({ length: 24 }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  currency: varchar({ length: 3 }).notNull(),
  createdBy: varchar('created_by', { length: 24 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
  updatedBy: varchar('updated_by', { length: 24 }),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 6 }),
  deletedBy: varchar('deleted_by', { length: 24 }),
  deletedAt: timestamp('deleted_at', { withTimezone: true, precision: 6 })
})

export const groupsRelations = relations(groups, ({ many }) => ({
  groupMembers: many(groupMembers)
}))

export const groupMembers = pgTable(
  'group_members',
  {
    id: varchar({ length: 24 }).primaryKey().notNull(),
    groupId: varchar('group_id', { length: 24 })
      .notNull()
      .references(() => groups.id),
    userId: varchar('user_id', { length: 24 }).notNull(),
    balance: integer().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
    deletedBy: varchar('deleted_by', { length: 24 }),
    deletedAt: timestamp('deleted_at', { withTimezone: true, precision: 6 })
  },
  t => ({ unq: unique().on(t.groupId, t.userId) })
)

export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id]
  })
}))

export const groupTransactions = pgTable(
  'group_transactions',
  {
    id: varchar({ length: 24 }).primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    amount: integer().notNull(),
    groupId: varchar('group_id', { length: 24 })
      .notNull()
      .references(() => groups.id),
    payerMemberId: varchar('payer_member_id', { length: 24 })
      .notNull()
      .references(() => groupMembers.id),
    createdBy: varchar('created_by', { length: 24 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
    updatedBy: varchar('updated_by', { length: 24 }),
    updatedAt: timestamp('updated_at', { withTimezone: true, precision: 6 })
  },
  t => ({ idx: index().on(t.groupId) })
)

export const groupTransactionsRelations = relations(groupTransactions, ({ many }) => ({
  groupTransactionParticipants: many(groupTransactionParticipants)
}))

export const groupTransactionParticipants = pgTable(
  'group_transaction_participants',
  {
    groupTransactionId: varchar('group_transaction_id', { length: 24 })
      .notNull()
      .references(() => groupTransactions.id),
    memberId: varchar('member_id', { length: 24 })
      .notNull()
      .references(() => groupMembers.id),
    amount: integer().notNull()
  },
  t => ({ unq: unique().on(t.groupTransactionId, t.memberId) })
)

export const groupTransactionParticipantRelations = relations(
  groupTransactionParticipants,
  ({ one }) => ({
    groupTransaction: one(groupTransactions, {
      fields: [groupTransactionParticipants.groupTransactionId],
      references: [groupTransactions.id]
    })
  })
)
