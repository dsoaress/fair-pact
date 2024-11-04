import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'production', 'test']).default('local'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string()
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) throw new Error(parsedEnv.error.format()._errors.join('\n'))

export const env = parsedEnv.data
