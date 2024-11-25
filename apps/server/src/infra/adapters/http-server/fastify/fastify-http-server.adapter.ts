import type { FastifyInstance } from 'fastify'

import type { Server } from 'node:http'
import type { Handler, HttpServer, Permission } from '@/core/base/http-server'
import { requestHandler } from './utils/request.handler'
import { setup } from './utils/setup'

export class FastifyHttpServerAdapter implements HttpServer {
  constructor(private readonly server: FastifyInstance) {
    setup(server)
  }

  async listen(port: number, callback?: () => void): Promise<void> {
    await this.server.listen({ port, host: '0.0.0.0' })
    callback?.()
  }

  async ready(): Promise<void> {
    await this.server.ready()
  }

  async close(): Promise<void> {
    await this.server.close()
  }

  signJwt(payload: Record<string, unknown>): string {
    return this.server.jwt.sign(payload)
  }

  async get<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('get', permission, path, handler, this.server)
  }

  async post<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('post', permission, path, handler, this.server)
  }

  async patch<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('patch', permission, path, handler, this.server)
  }

  async put<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('put', permission, path, handler, this.server)
  }

  async delete<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void> {
    await requestHandler('delete', permission, path, handler, this.server)
  }

  getRawServer(): Server {
    return this.server.server
  }
}
