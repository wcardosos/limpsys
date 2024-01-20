import { Connection } from '@/infra/database/connections/connection'
import { makeRouteCustomer } from '../../../utils/factories/entities/make-route-customer'
import { PostgresRouteCustomersRepository } from '@/infra/database/repositories/postgres-route-customers'
import { RouteCustomer } from '@/domain/route/entities/customer'

describe('Repository: PostgresRouteCustomers', () => {
  const connectionMock = {
    connect: vi.fn(),
    disconnect: vi.fn(),
    executeQuery: vi.fn(),
  } satisfies Connection
  const customersMock = [makeRouteCustomer(), makeRouteCustomer()]

  const sut = new PostgresRouteCustomersRepository(connectionMock)

  describe('findAll', () => {
    it('should find all customers', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [
          {
            id: customersMock[0].id.value,
            name: customersMock[0].name,
            x_coordinate: customersMock[0].xCoordinate,
            y_coordinate: customersMock[0].yCoordinate,
          },
          {
            id: customersMock[1].id.value,
            name: customersMock[1].name,
            x_coordinate: customersMock[1].xCoordinate,
            y_coordinate: customersMock[1].yCoordinate,
          },
        ],
      })

      const result = await sut.findAll()

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(result).toBeInstanceOf(Array<RouteCustomer>)
      expect(result[0]).toEqual(customersMock[0])
      expect(result[1]).toEqual(customersMock[1])
    })
  })
})
