import { ConflictError } from '@/core/errors/conflict'

export class CustomerAlreadyExists extends ConflictError {
  constructor(email: string) {
    super(`A customer with email ${email} already exists`)
  }
}
