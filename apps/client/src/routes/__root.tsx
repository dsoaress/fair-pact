import { ProtectedLayout } from '@/components/protected-layout'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: ProtectedLayout
})
