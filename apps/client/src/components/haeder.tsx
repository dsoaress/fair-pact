import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

type HeaderProps = {
  title: string
  prevView?: string
  children?: ReactNode
}

export function Header({ children, title, prevView }: HeaderProps): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between fixed top-0 left-0 right-0 z-10 bg-primary border-b p-4 h-14 shadow">
      <div className="flex items-center gap-2">
        {prevView && (
          <button
            type="button"
            className="text-white"
            onClick={(): Promise<void> => navigate({ to: prevView })}
          >
            <ChevronLeft />
            <span className="sr-only">voltar</span>
          </button>
        )}
        <h1 className="font-bold text-sm text-white">{title}</h1>
      </div>
      {children}
    </div>
  )
}
