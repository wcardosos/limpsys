import { NotFoundError } from '@/core/errors/not-found'

export class CustomerNotFound extends NotFoundError {
  constructor(id: string) {
    super(`Customer with id ${id} not found`)
  }
}
