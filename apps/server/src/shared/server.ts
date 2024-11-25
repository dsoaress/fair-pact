import { env } from './config/env'
import { serverModule } from './server.module'

export async function server(): Promise<void> {
  await serverModule().listen(env.PORT)
}
