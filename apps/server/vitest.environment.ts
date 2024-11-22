import { execSync } from 'node:child_process'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import type { Environment } from 'vitest/environments'

export default (<Environment>{
  name: 'drizzle',
  transformMode: 'ssr',
  async setup(): Promise<{ teardown(): Promise<void> }> {
    const databaseContainer = await new PostgreSqlContainer().start()
    const connectionUri = databaseContainer.getConnectionUri()
    process.env.DATABASE_URL = connectionUri
    execSync(`cd ${import.meta.dirname} && DATABASE_URL=${connectionUri} npx drizzle-kit push`)
    return {
      async teardown(): Promise<void> {}
    }
  }
})
