import { cn } from '@/lib/utils'
import { Link, useLocation } from '@tanstack/react-router'
import { BellDot, CircleFadingPlus, HandCoins, User, Users } from 'lucide-react'

const LINKS = [
  {
    icon: <Users />,
    label: 'Amigos',
    url: '/friends'
  },
  {
    icon: <HandCoins />,
    label: 'Grupos',
    url: '/'
  },
  {
    icon: <CircleFadingPlus size={48} />,
    label: '',
    url: '/new-transaction'
  },
  {
    icon: <BellDot />,
    label: 'Atividade',
    url: '/activities'
  },
  {
    icon: <User />,
    label: 'Conta',
    url: '/account'
  }
]

export function Nav(): JSX.Element {
  const { pathname } = useLocation()
  return (
    <nav className="bg-white absolute bottom-0 right-0 left-0 border-t">
      <ul className="flex justify-between items-center pb-4">
        {LINKS.map(({ icon, label, url }) => (
          <li key={label}>
            <Link
              to={url}
              className={cn('flex flex-col gap-1 items-center justify-center p-4', {
                'text-primary': pathname === url
              })}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
