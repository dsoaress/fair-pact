import { type OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export function groupsDocs(registry: OpenAPIRegistry): void {
  const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  })

  registry.registerPath({
    method: 'get',
    path: '/groups',
    summary: 'Get groups',
    description: 'Get groups by user',
    tags: ['groups'],
    security: [{ [bearerAuth.name]: [] }],
    responses: {
      200: {
        description: 'Object with user profile',
        content: {
          'application/json': {
            schema: z.object({
              data: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  currency: z.string(),
                  balance: z.number()
                })
              )
            })
          }
        }
      }
    }
  })

  registry.registerPath({
    method: 'get',
    path: '/groups/{groupId}',
    summary: 'Get group',
    description: 'Get group by id',
    tags: ['groups'],
    security: [{ [bearerAuth.name]: [] }],
    request: {
      params: z.object({
        groupId: z.string()
      })
    },
    responses: {
      200: {
        description: 'Object with user profile',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                id: z.string(),
                name: z.string(),
                currency: z.string(),
                balance: z.array(
                  z.object({
                    memberId: z.string(),
                    firstName: z.string(),
                    lastName: z.string(),
                    amount: z.number()
                  })
                )
              })
            })
          }
        }
      }
    }
  })
}
