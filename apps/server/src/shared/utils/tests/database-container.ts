import { execSync } from 'node:child_process'
import path from 'node:path'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { drizzle } from 'drizzle-orm/node-postgres'

import { type DrizzleService, connection } from '@/infra/database/drizzle/drizzle.service'

export async function createDatabaseContainer(): Promise<DrizzleService> {
  const databaseContainer = await new PostgreSqlContainer().start()
  const connectionUri = databaseContainer.getConnectionUri()
  connection.connection = connectionUri
  const drizzleService = drizzle(connection)
  const rootDir = path.resolve(__dirname, '../../../..')
  execSync(`cd ${rootDir} && DATABASE_URL=${connectionUri} npx drizzle-kit migrate`)

  return drizzleService
}
