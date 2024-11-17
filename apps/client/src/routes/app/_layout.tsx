import { createFileRoute } from '@tanstack/react-router'

import { ProtectedLayout } from '@/components/protected-layout'

export const Route = createFileRoute('/app')({
  component: ProtectedLayout
})
