import { Header } from '@/components/common/header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
