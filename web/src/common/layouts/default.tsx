import { Header } from '@/common/components/header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-6">
        <Outlet />
      </main>
    </>
  )
}
