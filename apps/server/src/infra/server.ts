import { app } from './app'
import { env } from './config/env'

export async function server(): Promise<void> {
  await app.listen({ port: env.PORT, host: '0.0.0.0' }).catch(app.log.error)
}
