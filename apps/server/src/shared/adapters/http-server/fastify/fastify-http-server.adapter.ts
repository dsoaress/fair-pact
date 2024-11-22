import type { FastifyInstance } from 'fastify'

import type { Handler, HttpServer, Permission } from '@/shared/base/http-server'

import { requestHandler } from './utils/request.handler'
import { setup } from './utils/setup'

export class FastifyHttpServerAdapter implements HttpServer {
  constructor(private readonly app: FastifyInstance) {
    setup(app)
  }

  async listen(port: number, callback?: () => void): Promise<void> {
    await this.app.listen({ port })
    callback?.()
  }

  signJwt(payload: Record<string, unknown>): string {
    return this.app.jwt.sign(payload)
  }

  async get<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('get', permission, path, handler, this.app)
  }

  async post<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('post', permission, path, handler, this.app)
  }

  async patch<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('patch', permission, path, handler, this.app)
  }

  async put<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('put', permission, path, handler, this.app)
  }

  async delete<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('delete', permission, path, handler, this.app)
  }
}
