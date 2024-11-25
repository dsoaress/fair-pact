import { drizzle } from 'drizzle-orm/node-postgres'
import Redis from 'ioredis'

afterEach(async () => {
  if (!process.env.DATABASE_URL || !process.env.REDIS_HOST || !process.env.REDIS_PORT) return // skip tests without database, like unit tests
  await Promise.all([
    drizzle(process.env.DATABASE_URL).execute('DELETE FROM users'),
    new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }).flushdb()
  ])
})
