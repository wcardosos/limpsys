import { ReactNode, createContext, useState } from 'react'

interface CreateCustomerDialogValues {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
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

  return (
    <CreateCustomerDialogContext.Provider
      value={{
        isOpen,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </CreateCustomerDialogContext.Provider>
  )
}
