import { RouteCustomersRepository } from '@/domain/route/repositories/customers'
import { CalculateBetterRouteUseCase } from '@/domain/route/use-cases/calculate-better-route'
import { makeRouteCustomer } from '../../../utils/factories/entities/make-route-customer'

describe('Use case: CalculateBetterRouteUseCase', () => {
  const customersListMock = [
    makeRouteCustomer({ xCoordinate: 2, yCoordinate: 3 }),
    makeRouteCustomer({ xCoordinate: 5, yCoordinate: 8 }),
    makeRouteCustomer({ xCoordinate: 10, yCoordinate: 2 }),
    makeRouteCustomer({ xCoordinate: 4, yCoordinate: 6 }),
    makeRouteCustomer({ xCoordinate: 8, yCoordinate: 5 }),
  ]

  const routeCustomersRepository = {
    findAll: vi.fn().mockResolvedValue(customersListMock),
  } as RouteCustomersRepository
  const sut = new CalculateBetterRouteUseCase(routeCustomersRepository)

  describe('execute', () => {
    it('should return the route calculated', async () => {
      const result = await sut.execute()

      expect(result.route).toStrictEqual([
        customersListMock[0],
        customersListMock[3],
        customersListMock[1],
        customersListMock[4],
        customersListMock[2],
      ])
    })
  })
})
