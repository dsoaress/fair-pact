import { defineConfig } from 'drizzle-kit'

const { DATABASE_URL } = process.env

if (!DATABASE_URL) throw new Error('DATABASE_URL is required')

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/database/drizzle/schemas/index.ts',
  out: './src/infra/database/drizzle/migrations',
  migrations: {
    schema: 'public',
    table: 'drizzle_migrations'
  },
  dbCredentials: {
    url: DATABASE_URL
  }
})
