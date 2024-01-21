import { z } from 'zod'

export const listCustomersQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  page: z.coerce.number().optional(),
})
