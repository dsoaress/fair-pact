import { drizzle } from 'drizzle-orm/node-postgres'

import { env } from '@/infra/config/env'

import * as schema from './schemas'

export const drizzleSevice = drizzle({
  connection: env.DATABASE_URL,
  schema,
  logger: true
})

export type DrizzleService = typeof drizzleSevice
