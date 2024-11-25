import { execSync } from 'node:child_process'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { RedisContainer } from '@testcontainers/redis'
import type { Environment } from 'vitest/environments'

export default (<Environment>{
  name: 'drizzle',
  transformMode: 'ssr',
  async setup(): Promise<{ teardown(): Promise<void> }> {
    const [databaseContainer, cacheContainer] = await Promise.all([
      new PostgreSqlContainer().start(),
      new RedisContainer().start()
    ])
    const databaseConnectionUri = databaseContainer.getConnectionUri()
    process.env.DATABASE_URL = databaseConnectionUri
    process.env.REDIS_URL = cacheContainer.getConnectionUrl()
    execSync(
      `cd ${import.meta.dirname} && DATABASE_URL=${databaseConnectionUri} npx drizzle-kit push`
    )
    return {
      async teardown(): Promise<void> {}
    }
  }
})
