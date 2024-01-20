import { z } from 'zod'

export const createCustomerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  xCoordinate: z.number(),
  yCoordinate: z.number(),
})
