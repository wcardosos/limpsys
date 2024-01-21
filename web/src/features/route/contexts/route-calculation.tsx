import { ReactNode, createContext, useState } from 'react'
import { RouteCustomer } from '../entities/route-customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'

interface RouteCalculationContextValues {
  route: RouteCustomer[]
  calculateRoute: () => Promise<void>
}

export const RouteCalculationContext = createContext(
  {} as RouteCalculationContextValues,
)

interface RouteProviderProps {
  children: ReactNode
}

const apiGateway = new LimpsysGateway()

export function RouteCalculationProvider({ children }: RouteProviderProps) {
  const [route, setRoute] = useState<RouteCustomer[]>([])

  const calculateRoute = async () => {
    const calculatedRoute = await apiGateway.calculateRoute()

    setRoute(calculatedRoute)
  }

  return (
    <RouteCalculationContext.Provider
      value={{
        route,
        calculateRoute,
      }}
    >
      {children}
    </RouteCalculationContext.Provider>
  )
}
