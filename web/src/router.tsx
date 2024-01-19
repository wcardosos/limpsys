import { Routes, Route } from 'react-router-dom'
import { Home } from './views/home'
import { DefaultLayout } from './common/layouts/default'
import { Customers } from './views/customers'

export const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Início',
  },
  {
    path: '/customers',
    element: <Customers />,
    name: 'Clientes',
  },
]

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}
