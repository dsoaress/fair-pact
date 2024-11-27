import type { Server } from 'node:http'
import type { ZodSchema } from 'zod'

export const permissions = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE'
} as const

export type Permission = keyof typeof permissions

export const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  REDIRECT: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

export type Doc = {
  path: string
  description: string
  summary: string
  security?: unknown
  permission: Permission
  request?: {
    params?: ZodSchema
    query?: ZodSchema
    body?: ZodSchema
  }
  response?: {
    [status: number]: {
      description: string
      content?: {
        'application/json': {
          schema: ZodSchema
        }
      }
    }
  }
}

export type Handler<T> = (req: HttpRequest<T>, res: HttpResponse) => Promise<void>

export interface HttpServer {
  listen(port: number, callback?: () => void): Promise<void>
  ready(): Promise<void>
  close(): Promise<void>
  signJwt(payload: Record<string, unknown>): string
  get<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void>
  post<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void>
  patch<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void>
  put<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void>
  delete<T>(permission: Permission, path: string, handler: Handler<T>): Promise<void>
  getRawServer(): Server
}

export interface HttpRequest<T> {
  body: T extends { body: infer B } ? B : unknown
  params: T extends { params: infer P } ? P : Record<string, string>
  query: T extends { query: infer Q } ? Q : Record<string, string>
  headers: T extends { headers: infer H } ? H : Record<string, string>
  userId: string
}

export interface HttpResponse {
  send: (data: { data: unknown }) => void
  redirect: (url: string) => void
  status: (code: number) => HttpResponse
}
