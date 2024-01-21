import { Customer } from '../entities/customer'

export interface CustomersRepository {
  findAll(
    itemsPerPage: number,
    filters?: {
      name?: string
      email?: string
      phone?: string
      page?: number
    },
  ): Promise<Customer[]>
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create(customer: Customer): Promise<void>
  count(filters?: {
    name?: string
    email?: string
    phone?: string
    page?: number
  }): Promise<number>
  delete(id: string): Promise<void>
}
