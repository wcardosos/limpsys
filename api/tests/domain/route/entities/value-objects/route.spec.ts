import { RouteCustomer } from '@/domain/route/entities/customer'
import { Route } from '@/domain/route/entities/value-objects/route'
import { makeRouteCustomer } from 'tests/utils/factories/entities/make-route-customer'

describe('Value object: Route', () => {
  let sut: Route

  const customersListMock = [
    makeRouteCustomer({ xCoordinate: 2, yCoordinate: 3 }),
    makeRouteCustomer({ xCoordinate: 5, yCoordinate: 8 }),
    makeRouteCustomer({ xCoordinate: 10, yCoordinate: 2 }),
    makeRouteCustomer({ xCoordinate: 4, yCoordinate: 6 }),
    makeRouteCustomer({ xCoordinate: 8, yCoordinate: 5 }),
  ]

  beforeEach(() => {
    sut = new Route(customersListMock)
  })

  describe('calculateDistanceBetweenCustomers', () => {
    it('should calculate the distance', () => {
      const result = sut.calculateDistanceBetweenCustomers(
        customersListMock[0],
        customersListMock[1],
      )

      expect(result).toBeCloseTo(5.831)
    })

    it('should return 0 when customers are in the same point', () => {
      const result = sut.calculateDistanceBetweenCustomers(
        customersListMock[0],
        customersListMock[0],
      )

      expect(result).toBe(0)
    })
  })

  describe('findNearestNeighbor', () => {
    const currentCustomer = customersListMock[0]

    it('should find a customer nearest neighbor on customers list', () => {
      const remainingCustomers: RouteCustomer[] = [
        customersListMock[1],
        customersListMock[2],
      ]

      const result = sut.findNearestNeighbor(
        currentCustomer,
        remainingCustomers,
      )

      expect(result).toStrictEqual(remainingCustomers[0])
    })

    it('should return undefined when remaining customers list is empty', () => {
      const remainingCustomers: RouteCustomer[] = []

      const result = sut.findNearestNeighbor(
        currentCustomer,
        remainingCustomers,
      )

      expect(result).toBeUndefined()
    })
  })

  describe('calculate', () => {
    it('should calculate the route correctly', () => {
      const result = sut.calculate()

      expect(result).toStrictEqual([
        customersListMock[0],
        customersListMock[3],
        customersListMock[1],
        customersListMock[4],
        customersListMock[2],
      ])
    })
  })
})
