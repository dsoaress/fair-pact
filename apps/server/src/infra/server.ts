import { app } from './app'
import { env } from './config/env'

export async function server(): Promise<void> {
  await app
    .listen({
      port: env.PORT,
      host: '0.0.0.0'
    })
    .then(() => {
      console.log(`Server is running on port ${env.PORT}`)
    })
}
