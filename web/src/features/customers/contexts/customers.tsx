import { ReactNode, createContext, useState } from 'react'
import { Customer } from '../entities/customer'

interface CustomersContextValues {
  customers: Customer[]
  setCustomers: (value: Customer[]) => void
}

export const CustomersContext = createContext({} as CustomersContextValues)

interface CustomersProviderProps {
  children: ReactNode
}

export function CustomersProvider({ children }: CustomersProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>([])

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomersContext.Provider>
  )
}
