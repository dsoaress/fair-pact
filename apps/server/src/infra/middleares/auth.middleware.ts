import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception'
import type { FastifyRequest } from 'fastify'

export async function authMiddleware(request: FastifyRequest): Promise<void> {
  try {
    await request.jwtVerify()
  } catch {
    throw new UnauthorizedException()
  }
}
