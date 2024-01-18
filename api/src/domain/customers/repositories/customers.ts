import { Customer } from '../entities/customer'

export interface CustomersRepository {
  findAll(): Promise<Customer[]>
}
