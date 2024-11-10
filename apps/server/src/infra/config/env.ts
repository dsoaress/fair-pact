import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'production', 'test']).default('local'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string()
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success)
  throw new Error(JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2))

export const env = parsedEnv.data
