import type { Handler, HttpRequest, HttpResponse, Permission } from '@/core/base/http-server'
import type { FastifyInstance } from 'fastify'
import { checkPermission } from './check-permission'

export async function requestHandler<T>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  permission: Permission,
  path: string,
  handler: Handler<T>,
  server: FastifyInstance
): Promise<void> {
  server[method](path, async (req, res) => {
    await checkPermission(permission, req)
    const httpRequest: HttpRequest<T> = {
      body: req.body as T extends { body: infer B } ? B : undefined,
      params: req.params as T extends { params: infer P } ? P : Record<string, string>,
      query: req.query as T extends { query: infer Q } ? Q : Record<string, string>,
      headers: req.headers as T extends { headers: infer H } ? H : Record<string, string>,
      userId: req.user?.sub ?? ''
    }

    const httpResponse: HttpResponse = {
      send: data => {
        res.send(data)
      },
      redirect: url => {
        res.redirect(url)
      },
      status: code => {
        res.status(code)
        return httpResponse
      }
    }

    await handler(httpRequest, httpResponse)
  })
}
