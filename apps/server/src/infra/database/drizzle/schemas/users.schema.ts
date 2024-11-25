import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  avatar: varchar({ length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull()
})

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true, precision: 6 }).notNull()
})
