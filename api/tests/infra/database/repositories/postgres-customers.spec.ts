import { Customer } from '@/domain/customers/entities/customer'
import { Connection } from '@/infra/database/connections/connection'
import { queries } from '@/infra/database/queries/customers'
import { PostgresCustomersRepository } from '@/infra/database/repositories/postgres-customers'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'

describe('Repository: PostgresCustomers', () => {
  let sut: PostgresCustomersRepository

  const connectionMock = {
    connect: vi.fn(),
    disconnect: vi.fn(),
    executeQuery: vi.fn(),
  } satisfies Connection
  const customersMock = [makeCustomer(), makeCustomer()]
  const itemsPerPageMock = 5

  beforeEach(() => {
    sut = new PostgresCustomersRepository(connectionMock)

    vi.resetAllMocks()
  })

  describe('findAll', () => {
    it('should find all customers', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [
          {
            id: customersMock[0].id.value,
            name: customersMock[0].name,
            email: customersMock[0].email,
            phone: customersMock[0].phone,
            x_coordinate: customersMock[0].xCoordinate,
            y_coordinate: customersMock[0].yCoordinate,
          },
          {
            id: customersMock[1].id.value,
            name: customersMock[1].name,
            email: customersMock[1].email,
            phone: customersMock[1].phone,
            x_coordinate: customersMock[1].xCoordinate,
            y_coordinate: customersMock[1].yCoordinate,
          },
        ],
      })

      const result = await sut.findAll(itemsPerPageMock)

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(result).toBeInstanceOf(Array<Customer>)
      expect(result[0]).toEqual(customersMock[0])
      expect(result[1]).toEqual(customersMock[1])
    })

    describe('filters', () => {
      it('should add name filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })
        await sut.findAll(itemsPerPageMock, { name: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(
          queries.findAll,
          ['%test%', '%%', '%%', 0, itemsPerPageMock],
        )
      })

      it('should add email filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })

        await sut.findAll(itemsPerPageMock, { email: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(
          queries.findAll,
          ['%%', '%test%', '%%', 0, itemsPerPageMock],
        )
      })

      it('should add phone filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })

        await sut.findAll(itemsPerPageMock, { phone: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(
          queries.findAll,
          ['%%', '%%', '%test%', 0, itemsPerPageMock],
        )
      })

      it('should add page filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })

        await sut.findAll(itemsPerPageMock, { page: 2 })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(
          queries.findAll,
          ['%%', '%%', '%%', 5, itemsPerPageMock],
        )
      })
    })
  })

  describe('findByEmail', () => {
    it('should return a customer when found', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [
          {
            id: customersMock[0].id.value,
            name: customersMock[0].name,
            email: customersMock[0].email,
            phone: customersMock[0].phone,
          },
        ],
      })

      const result = await sut.findByEmail(customersMock[0].email)

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(result).toBeInstanceOf(Customer)
    })

    it('should return null when customer not found', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [],
      })

      const result = await sut.findByEmail(customersMock[0].email)

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(result).toBeNull()
    })
  })

  describe('count', () => {
    it('should return the customers count', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [{ count: '5' }],
      })

      const result = await sut.count()

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(result).toBe(5)
    })

    it('should return the customers count with filters', async () => {
      connectionMock.executeQuery.mockResolvedValueOnce({
        rows: [{ count: '5' }],
      })
      const filtersMock = {
        name: 'name',
        email: 'email',
        phone: 'phone',
        page: 1,
      }

      const result = await sut.count(filtersMock)

      expect(connectionMock.executeQuery).toHaveBeenCalledOnce()
      expect(connectionMock.executeQuery).toHaveBeenCalledWith(queries.count, [
        '%name%',
        '%email%',
        '%phone%',
      ])
      expect(result).toBe(5)
    })
  })
})
