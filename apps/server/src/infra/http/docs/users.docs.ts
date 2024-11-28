import { type OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export function usersDocs(registry: OpenAPIRegistry): void {
  const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  })

  registry.registerPath({
    method: 'get',
    path: '/users/profile',
    summary: 'Get user profile',
    description: 'Get user profile by JWT token',
    tags: ['users'],
    security: [{ [bearerAuth.name]: [] }],
    responses: {
      200: {
        description: 'Object with user profile',
        content: {
          'application/json': {
            schema: z.object({
              id: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string(),
              avatar: z.string().nullable()
            })
          }
        }
      }
    }
  })
}
