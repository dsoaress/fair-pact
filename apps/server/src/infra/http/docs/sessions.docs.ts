import { type OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export function sessionsDocs(registry: OpenAPIRegistry): void {
  registry.registerPath({
    method: 'post',
    path: '/sessions/refresh',
    summary: 'Refresh token',
    description: 'Returns a new JWT token',
    tags: ['sessions'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              refreshToken: z.string()
            })
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Object with new JWT token',
        content: {
          'application/json': {
            schema: z.object({
              token: z.string(),
              refreshToken: z.string()
            })
          }
        }
      }
    }
  })
}
