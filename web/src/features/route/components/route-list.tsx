import { useContext } from 'react'
import { RouteCalculationContext } from '../contexts/route-calculation'
import { RouteItem } from './route-item'

export function RouteList() {
  const { route } = useContext(RouteCalculationContext)
  return (
    <section className="grid grid-cols-4 gap-y-6 bg-blue-50 px-20 py-16 border border-blue-500 rounded">
      <RouteItem position={1} value="Empresa" />
      {route.map((customer, index) => (
        <RouteItem key={index + 2} position={index + 2} value={customer.name} />
      ))}
      <RouteItem position={route.length + 2} value="Volta à empresa" />
    </section>
  )
}
