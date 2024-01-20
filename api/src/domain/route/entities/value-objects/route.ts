import { RouteCustomer } from '../customer'

export class Route {
  constructor(private customers: RouteCustomer[]) {}

  calculateDistanceBetweenCustomers(
    customerA: RouteCustomer,
    customerB: RouteCustomer,
  ) {
    const xDelta = customerA.xCoordinate - customerB.xCoordinate
    const yDelta = customerA.yCoordinate - customerB.yCoordinate

    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2))
  }

  findNearestNeighbor(
    currentCustomer: RouteCustomer,
    remainingCustomers: RouteCustomer[],
  ) {
    let minimalDistance = Infinity
    let nearestNeighbor: RouteCustomer | undefined

    for (const customer of remainingCustomers) {
      const currentDistance = this.calculateDistanceBetweenCustomers(
        currentCustomer,
        customer,
      )

      if (currentDistance < minimalDistance) {
        minimalDistance = currentDistance
        nearestNeighbor = customer
      }
    }

    return nearestNeighbor
  }

  calculate() {
    const betterRoute: RouteCustomer[] = []
    const enterpriseDummy = RouteCustomer.create({
      name: 'Empresa',
      xCoordinate: 0,
      yCoordinate: 0,
    })
    let currentCustomer = enterpriseDummy

    while (this.customers.length > 0) {
      const nearestNeighbor = this.findNearestNeighbor(
        currentCustomer,
        this.customers,
      )

      if (nearestNeighbor) {
        betterRoute.push(nearestNeighbor)
        this.customers = this.customers.filter(
          (customer) => customer !== nearestNeighbor,
        )
        currentCustomer = nearestNeighbor
      }
    }

    return betterRoute
  }
}
