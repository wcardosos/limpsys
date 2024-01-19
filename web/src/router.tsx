import { Routes, Route } from 'react-router-dom'
import { Home } from './views/home'
import { DefaultLayout } from './layouts/default'

export const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Início',
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
