import {
  Dialog,
  DialogContent,
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
      <DialogContent className="w-[512px] max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="text-blue-500 text-xl">
            Cadastro de cliente
          </DialogTitle>
        </DialogHeader>
        <CreateCustomerForm />
      </DialogContent>
    </Dialog>
  )
}
