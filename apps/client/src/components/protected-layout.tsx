import { Outlet } from '@tanstack/react-router'
import { Nav } from './nav'

export function ProtectedLayout(): JSX.Element {
  return (
    <div className="h-screen overflow-x-hidden pb-24">
      <div className="p-4 relative">
        <Outlet />
      </div>
      <Nav />
    </div>
  )
}
