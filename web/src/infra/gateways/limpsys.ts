import { Customer } from '@/features/customers/entities/customer'
import { AxiosGateway } from './axios'

export class LimpsysGateway extends AxiosGateway {
  constructor() {
    super('http://localhost:3333')
  }

  async fetchCustomers(): Promise<{
    customers: Customer[]
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }> {
    const customers = await this.get('/customers')

    return customers
  }

  async fetchCustomersCount(): Promise<number> {
    const { count } = await this.get('/customers/count')

    return count
  }

  async filterCustomers(queryParams: string): Promise<{
    customers: Customer[]
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }> {
    const customers = await this.get(`/customers${queryParams}`)

    return customers
  }

  async createCustomer(customer: Customer): Promise<void> {
    await this.post('/customers', customer)
  }

  async calculateRoute() {
    const route = await this.get('/route')

    return route
  }
}
