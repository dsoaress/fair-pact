import { groupsModule } from '@/modules/groups/groups.module'
import { usersModule } from '@/modules/users/users.module'
import type { HttpServer } from './base/http-server'
import { drizzleModule } from './database/drizzle/drizzle.module'

type Input = {
  server: HttpServer
}

export function appModule({ server }: Input): void {
  const {
    groupTransactionsDAO,
    groupTransactionsRepository,
    groupsDAO,
    groupsRepository,
    sessionsRepository,
    usersDAO,
    usersRepository
  } = drizzleModule()

  groupsModule({
    groupTransactionsDAO,
    groupTransactionsRepository,
    groupsDAO,
    groupsRepository,
    server
  })

  usersModule({
    server,
    sessionsRepository,
    usersDAO,
    usersRepository
  })
}
