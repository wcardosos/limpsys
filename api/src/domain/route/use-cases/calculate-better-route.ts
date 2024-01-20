import { inject, injectable } from 'tsyringe'
import { RouteCustomer } from '../entities/customer'
import { Route } from '../entities/value-objects/route'
import { RouteCustomersRepository } from '../repositories/customers'

interface CalculateBetterRouteUseCaseResponse {
  route: RouteCustomer[]
}

@injectable()
export class CalculateBetterRouteUseCase {
  constructor(
    @inject('RouteCustomersRepository')
    private routeCustomersRepository: RouteCustomersRepository,
  ) {}

  async execute(): Promise<CalculateBetterRouteUseCaseResponse> {
    const customers = await this.routeCustomersRepository.findAll()

    const route = new Route(customers)

    return { route: route.calculate() }
  }
}
