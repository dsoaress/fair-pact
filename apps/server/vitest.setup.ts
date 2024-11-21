import { drizzle } from 'drizzle-orm/node-postgres'

afterEach(async () => {
  if (!process.env.DATABASE_URL) return // skip tests without database, like unit tests
  await drizzle(process.env.DATABASE_URL).execute('DELETE FROM users')
})