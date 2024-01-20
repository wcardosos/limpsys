import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog'
import { CreateCustomerForm } from '@/features/customers/components/forms/create-customer'
import { ReactNode, useContext } from 'react'
import { CreateCustomerDialogContext } from '../contexts/create-customer-dialog'

interface CreateCustomerDialogProps {
  children: ReactNode
}

export function CreateCustomerDialog({ children }: CreateCustomerDialogProps) {
  const { isOpen, openDialog } = useContext(CreateCustomerDialogContext)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={openDialog}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[512px]">
        <DialogHeader>
          <DialogTitle className="text-blue-500 text-xl">
            Cadastro de cliente
          </DialogTitle>
          <DialogDescription>
            Você poderá editar esse cliente no futuro.
          </DialogDescription>
        </DialogHeader>
        <CreateCustomerForm />
      </DialogContent>
    </Dialog>
  )
}
