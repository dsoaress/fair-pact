import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { groupMembers } from './groups.schema'

export const users = pgTable('users', {
  id: varchar({ length: 24 }).primaryKey().notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull()
})

export const usersMembersRelations = relations(groupMembers, ({ many }) => ({
  groupMembers: many(groupMembers)
}))
