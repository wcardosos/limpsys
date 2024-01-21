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
import { useToast } from '@/common/components/ui/use-toast'
import { useErrorFeedback } from '@/common/hooks/use-error-feedback'

const createCustomerFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(99, 'O nome deve ter no máximo 99 caracteres'),
  email: z.string().email('O e-mail informado é inválido'),
  phone: z
    .string()
    .length(11, 'O número de telefone deve ter 11 dígitos')
    .regex(/^\d+$/, 'O telefone deve ser preenchido apenas com números'),
  xCoordinate: z.coerce
    .number({
      invalid_type_error: 'A coordenada X deve ser um número',
    })
    .int('A coordenada X deve ser um número inteiro')
    .positive('A coordenada X deve ser positiva'),
  yCoordinate: z.coerce
    .number({
      invalid_type_error: 'A coordenada Y deve ser um número',
    })
    .int('A coordenada Y deve ser um número inteiro')
    .positive('A coordenada Y deve ser positiva'),
})

type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>

export function CreateCustomerForm() {
  const { closeDialog, createCustomer } = useContext(
    CreateCustomerDialogContext,
  )
  const createCustomerForm = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      xCoordinate: 0,
      yCoordinate: 0,
    },
  })
  const { toast } = useToast()
  const { showErrorFeedback } = useErrorFeedback()

  const onSubmitCreateCustomer = async (formValues: CreateCustomerFormData) => {
    try {
      await createCustomer(formValues)
      closeDialog()
      toast({
        description: `Cliente ${formValues.name} criado com sucesso!`,
        className: 'bg-green-100 border-green-500 text-green-500',
      })
    } catch (error) {
      showErrorFeedback(
        `O cliente ${formValues.name} não pôde ser criado. Tente novamente`,
      )
    }
  }

  return (
    <Form {...createCustomerForm}>
      <form
        onSubmit={createCustomerForm.handleSubmit(onSubmitCreateCustomer)}
        className="space-y-6"
      >
        <div className="flex gap-6">
          <div className="space-y-4 w-1/2">
            <FormField
              control={createCustomerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-normal">
                    Nome
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
                    Telefone (com DDD)
                  </FormLabel>
                  <FormControl>
                    <Input className="focus-visible:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4 w-1/2">
            <FormField
              control={createCustomerForm.control}
              name="xCoordinate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-normal">
                    Coordenada X
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
              name="yCoordinate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-normal">
                    Coordenada Y
                  </FormLabel>
                  <FormControl>
                    <Input className="focus-visible:ring-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
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
