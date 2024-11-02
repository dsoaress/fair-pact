import { createLazyFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

export const Route = createLazyFileRoute('/about')({
  component: About
})

function About(): JSX.Element {
  return <div className="p-2">Hello from About!</div>
}
