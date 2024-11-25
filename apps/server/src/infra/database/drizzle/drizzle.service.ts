import { drizzle } from 'drizzle-orm/node-postgres'

import { env } from '@/infra/config/env'

import * as schema from './schemas'

export const drizzleService = drizzle({
  connection: env.DATABASE_URL,
  schema,
  logger: env.NODE_ENV === 'local'
})

export type DrizzleService = typeof drizzleService
