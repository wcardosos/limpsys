import { ReactNode, createContext, useState } from 'react'
import { Customer } from '../entities/customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'

const apiGateway = new LimpsysGateway()

interface CreateCustomerDialogValues {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
  createCustomer: (customer: Customer) => void
}

export const CreateCustomerDialogContext = createContext(
  {} as CreateCustomerDialogValues,
)

interface CreateCustomerDialogProviderProps {
  children: ReactNode
}

export function CreateCustomerDialogProvider({
  children,
}: CreateCustomerDialogProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const createCustomer = async ({ name, email, phone }: Customer) => {
    return apiGateway.createCustomer({ name, email, phone })
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
