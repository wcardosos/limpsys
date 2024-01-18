import { z } from 'zod'

export const listAllCustomersQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
})
