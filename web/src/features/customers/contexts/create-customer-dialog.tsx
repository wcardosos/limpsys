import { ReactNode, createContext, useContext, useState } from 'react'
import { Customer } from '../entities/customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'
import { CustomersContext } from './customers'
import { useLocation, useNavigate } from 'react-router-dom'

const apiGateway = new LimpsysGateway()

interface CreateCustomerDialogContextValues {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
  createCustomer: (customer: Customer) => void
}

export const CreateCustomerDialogContext = createContext(
  {} as CreateCustomerDialogContextValues,
)

interface CreateCustomerDialogProviderProps {
  children: ReactNode
}

export function CreateCustomerDialogProvider({
  children,
}: CreateCustomerDialogProviderProps) {
  const { setCustomers } = useContext(CustomersContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const currentPath = useLocation()

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const createCustomer = async ({
    name,
    email,
    phone,
    xCoordinate,
    yCoordinate,
  }: Customer) => {
    await apiGateway.createCustomer({
      name,
      email,
      phone,
      xCoordinate,
      yCoordinate,
    })

    if (currentPath.pathname === '/customers') {
      const { customers } = await apiGateway.fetchCustomers()
      setCustomers(customers)
    } else {
      navigate('/customers')
    }
  }

  return (
    <CreateCustomerDialogContext.Provider
      value={{
        isOpen,
        openDialog,
        closeDialog,
        createCustomer,
      }}
    >
      {children}
    </CreateCustomerDialogContext.Provider>
  )
}
