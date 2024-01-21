import { Customer } from '../entities/customer'

export interface CustomersRepository {
  findAll(filters?: {
    name?: string
    email?: string
    phone?: string
  }): Promise<Customer[]>
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create(customer: Customer): Promise<void>
  count(): Promise<number>
  delete(id: string): Promise<void>
}
