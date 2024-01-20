import { RouteCustomer } from '../entities/customer'

export interface RouteCustomersRepository {
  findAll(): Promise<RouteCustomer[]>
}
