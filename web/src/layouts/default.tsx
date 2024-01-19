import { routes } from '@/router'
import { Link, Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <header className="bg-blue-500 py-6 text-gray-50">
        <div className="max-w-5xl mx-auto flex justify-between">
          <span className="text-xl font-bold">limpsys</span>
          <nav className="flex gap-2">
            {routes.map((route) => (
              <Link key={route.path} to={route.path}>
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}
