import { Nav } from './nav'

export function Header() {
  return (
    <header className="bg-blue-500 py-6 text-gray-50 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between">
        <span className="text-xl font-bold">limpsys</span>
        <Nav />
      </div>
    </header>
  )
}
