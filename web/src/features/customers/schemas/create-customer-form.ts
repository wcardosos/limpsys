import { z } from 'zod'

export const createCustomerFormSchema = z.object({
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

export type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>
