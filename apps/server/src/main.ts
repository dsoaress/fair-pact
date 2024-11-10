import { app } from './shared/app'
import { env } from './shared/config/env'

app.listen({ port: env.PORT, host: '0.0.0.0' }).catch(app.log.error)
