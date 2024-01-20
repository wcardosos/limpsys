import { ReactNode, createContext, useEffect, useState } from 'react'
import { Customer } from '../entities/customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'

interface CustomersFilter {
  name?: string
  email?: string
  phone?: string
}

interface CustomerListTableValues {
  data: Customer[]
  setData: (value: Customer[]) => void
  isFetching: boolean
  filterCustomers: (filters: CustomersFilter) => Promise<void>
}

export const CustomersListTableContext = createContext(
  {} as CustomerListTableValues,
)

interface CustomersListTableProviderProps {
  children: ReactNode
}

const apiGateway = new LimpsysGateway()

export function CustomersListTableProvider({
  children,
}: CustomersListTableProviderProps) {
  const [data, setData] = useState<Customer[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    apiGateway.get('/customers').then((customers) => {
      setData(customers)
      setIsFetching(false)
    })
  }, [])

  const composeQueryParamsFromFilters = (filters?: CustomersFilter) => {
    const queryParams = []

    if (filters) {
      for (const [filter, value] of Object.entries(filters)) {
        if (value) queryParams.push(`${filter}=${value}`)
      }
    }

    return queryParams.length ? `?${queryParams.join('&')}` : ''
  }

  const filterCustomers = async (filters: CustomersFilter) => {
    const queryParams = composeQueryParamsFromFilters(filters)

    setIsFetching(true)

    const customers = await apiGateway.get(`/customers${queryParams}`)

    setData(customers)

    setIsFetching(false)
  }

  return (
    <CustomersListTableContext.Provider
      value={{
        data,
        setData,
        isFetching,
        filterCustomers,
      }}
    >
      {children}
    </CustomersListTableContext.Provider>
  )
}
