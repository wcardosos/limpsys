import { Input } from '@/common/components/ui/input'
import { Button } from '@/common/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCustomerDialogContext } from '../../contexts/create-customer-dialog'
import { useContext } from 'react'

const createCustomerFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(99, 'O nome deve ter no máximo 99 caracteres'),
  email: z.string().email('O e-mail informado é inválido'),
  phone: z
    .string()
    .length(
      11,
      'O número de telefone deve ser preenchido sem caracteres especiais e com DDD',
    )
    .regex(/\d+/, 'O telefone deve ser preenchido apenas com números'),
})
type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>
export function CreateCustomerForm() {
  const { closeDialog } = useContext(CreateCustomerDialogContext)
  const createCustomerForm = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmitCreateCustomer = (formValues: CreateCustomerFormData) => {
    console.log(`form values: ${JSON.stringify(formValues)}`)

    closeDialog()
  }

  return (
    <Form {...createCustomerForm}>
      <form
        onSubmit={createCustomerForm.handleSubmit(onSubmitCreateCustomer)}
        className="space-y-4"
      >
        <FormField
          control={createCustomerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-normal">Nome</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-blue-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createCustomerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-normal">
                E-mail
              </FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-blue-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createCustomerForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-normal">
                Telefone
              </FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-blue-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2 flex gap-2 justify-end">
          <Button
            className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-500 font-normal"
            type="button"
            variant="outline"
            onClick={closeDialog}
          >
            Cancelar
          </Button>
          <Button
            className="bg-blue-500 text-gray-50 hover:bg-blue-600"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
