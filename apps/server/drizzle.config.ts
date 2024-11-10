import { defineConfig } from 'drizzle-kit'

const { DATABASE_URL } = process.env

if (!DATABASE_URL) throw new Error('DATABASE_URL is required')

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/shared/database/drizzle/schemas/index.ts',
  out: './src/shared/database/drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL
  }
})
