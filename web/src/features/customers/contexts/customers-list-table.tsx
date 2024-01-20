import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { LimpsysGateway } from '@/infra/gateways/limpsys'
import { CustomersContext } from './customers'
import { Customer } from '../entities/customer'

interface CustomersFilter {
  name?: string
  email?: string
  phone?: string
}

interface CustomerListTableContextValues {
  data: Customer[]
  isFetching: boolean
  filterCustomers: (filters: CustomersFilter) => Promise<void>
}

export const CustomersListTableContext = createContext(
  {} as CustomerListTableContextValues,
)

interface CustomersListTableProviderProps {
  children: ReactNode
}

const apiGateway = new LimpsysGateway()

export function CustomersListTableProvider({
  children,
}: CustomersListTableProviderProps) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { customers, setCustomers } = useContext(CustomersContext)

  useEffect(() => {
    apiGateway.fetchCustomers().then((customers) => {
      setCustomers(customers)
      setIsFetching(false)
    })
  }, [setCustomers])

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

    const customers = await apiGateway.filterCustomers(queryParams)

    setCustomers(customers)

    setIsFetching(false)
  }

  return (
    <CustomersListTableContext.Provider
      value={{
        data: customers,
        isFetching,
        filterCustomers,
      }}
    >
      {children}
    </CustomersListTableContext.Provider>
  )
}
