import { Header } from '@/common/components/header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
