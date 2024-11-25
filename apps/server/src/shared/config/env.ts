import { z } from 'zod'

const envSchema = z
  .object({
    NODE_ENV: z.enum(['ci', 'test', 'local', 'development', 'production']).default('local'),
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GOOGLE_OAUTH_REDIRECT_URL: z.string().url(),
    CLIENT_URL: z.string().url().default('http://localhost:3001')
  })
  .refine(data => {
    const isCIEnv = data.NODE_ENV === 'ci' || data.NODE_ENV === 'test'
    const isLocalEnv = data.NODE_ENV === 'local'
    const isProductionOrDevelopmentEnv =
      data.NODE_ENV === 'development' || data.NODE_ENV === 'production'
    const hasGoogleOAuth = Boolean(data.GOOGLE_CLIENT_ID && data.GOOGLE_CLIENT_SECRET)
    if (isCIEnv) return true
    if (isProductionOrDevelopmentEnv && !hasGoogleOAuth) return false
    if (isLocalEnv && !hasGoogleOAuth) {
      console.info(
        'Google OAuth 2.0 is not configured, please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google OAuth'
      )
      return true
    }
    return true
  }, 'Google OAuth 2.0 credentials is required in production and development environments')

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success)
  throw new Error(JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2))

export const env = parsedEnv.data
