import { Button } from '@/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog'
import { CreateCustomerForm } from '@/features/customers/components/forms/create-customer'
import { useContext } from 'react'
import { CreateCustomerDialogContext } from '../contexts/create-customer-dialog'

export function CreateCustomerDialog() {
  const { isOpen, openDialog } = useContext(CreateCustomerDialogContext)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={openDialog}>
        <Button
          variant="ghost"
          className="text-blue-500 hover:text-blue-500 hover:bg-blue-100"
        >
          Adicionar cliente
        </Button>
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
