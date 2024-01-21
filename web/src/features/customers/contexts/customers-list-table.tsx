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

interface CustomerListTableContextValues {
  data: Customer[]
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFetching: boolean
  hasFilterValues: boolean
  filterCustomers: (page?: number) => Promise<void>
  deleteCustomer: (customerId: string) => Promise<void>
  setNameFilter: (value: string) => void
  setEmailFilter: (value: string) => void
  setPhoneFilter: (value: string) => void
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
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)
  const [nameFilter, setNameFilter] = useState<string>('')
  const [emailFilter, setEmailFilter] = useState<string>('')
  const [phoneFilter, setPhoneFilter] = useState<string>('')
  const { customers, setCustomers } = useContext(CustomersContext)

  const hasFilterValues = Boolean(nameFilter || emailFilter || phoneFilter)

  useEffect(() => {
    apiGateway
      .fetchCustomers()
      .then(({ customers, currentPage, hasNextPage, hasPreviousPage }) => {
        setCustomers(customers)
        setCurrentPage(currentPage)
        setHasNextPage(hasNextPage)
        setHasPreviousPage(hasPreviousPage)
        setIsFetching(false)
      })
  }, [setCustomers])

  const composeQueryParamsFromFilters = (page?: number) => {
    const queryParams = []

    for (const [filter, value] of Object.entries({
      name: nameFilter,
      email: emailFilter,
      phone: phoneFilter,
      page: page || currentPage,
    })) {
      if (value) queryParams.push(`${filter}=${value}`)
    }

    return queryParams.length ? `?${queryParams.join('&')}` : ''
  }

  const filterCustomers = async (page?: number) => {
    const queryParams = composeQueryParamsFromFilters(page)

    setIsFetching(true)

    const { customers, currentPage, hasNextPage, hasPreviousPage } =
      await apiGateway.filterCustomers(queryParams)

    setCustomers(customers)
    setCurrentPage(currentPage)
    setHasNextPage(hasNextPage)
    setHasPreviousPage(hasPreviousPage)

    setIsFetching(false)
  }

  const deleteCustomer = async (customerId: string) => {
    setIsFetching(true)

    await apiGateway.deleteCustomer(customerId)

    const { customers } = await apiGateway.fetchCustomers()
    setCustomers(customers)

    setIsFetching(false)
  }

  return (
    <CustomersListTableContext.Provider
      value={{
        data: customers,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        isFetching,
        hasFilterValues,
        filterCustomers,
        deleteCustomer,
        setNameFilter,
        setEmailFilter,
        setPhoneFilter,
      }}
    >
      {children}
    </CustomersListTableContext.Provider>
  )
}
