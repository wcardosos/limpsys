import { Customer } from '../entities/customer'

export interface CustomersRepository {
  findAll(): Promise<Customer[]>
  findByEmail(email: string): Promise<Customer | null>
  create(customer: Customer): Promise<void>
}
