import { routes } from '@/router'
import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav className="flex gap-2">
      {routes.map((route) => (
        <Link key={route.path} to={route.path}>
          {route.name}
        </Link>
      ))}
    </nav>
  )
}
