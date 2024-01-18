import { Customer } from '../entities/customer'

export interface CustomersRepository {
  findAll(filters?: {
    name?: string
    email?: string
    phone?: string
  }): Promise<Customer[]>
  findByEmail(email: string): Promise<Customer | null>
  create(customer: Customer): Promise<void>
}
