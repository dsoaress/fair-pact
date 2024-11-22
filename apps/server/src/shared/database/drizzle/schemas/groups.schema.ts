import { relations } from 'drizzle-orm'
import { index, integer, pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { users } from './users.schema'

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

export const groupRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers)
}))

export const groupMembers = pgTable(
  'group_members',
  {
    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    memberId: uuid('member_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull()
  },
  t => [primaryKey({ columns: [t.groupId, t.memberId] })]
)

export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, { fields: [groupMembers.groupId], references: [groups.id] })
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
    payerMemberId: uuid('payer_member_id')
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

export const groupTransactionRelations = relations(groupTransactions, ({ many }) => ({
  participants: many(groupTransactionParticipants)
}))

export const groupTransactionParticipants = pgTable(
  'group_transaction_participants',
  {
    groupTransactionId: uuid('group_transaction_id')
      .notNull()
      .references(() => groupTransactions.id, {
        onDelete: 'cascade'
      }),
    memberId: uuid('member_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    payerMemberId: uuid('payer_member_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    amount: integer().notNull()
  },
  t => [primaryKey({ columns: [t.groupTransactionId, t.memberId] })]
)

export const groupTransactionParticipantRelations = relations(
  groupTransactionParticipants,
  ({ one }) => ({
    transaction: one(groupTransactions, {
      fields: [groupTransactionParticipants.groupTransactionId],
      references: [groupTransactions.id]
    })
  })
)
