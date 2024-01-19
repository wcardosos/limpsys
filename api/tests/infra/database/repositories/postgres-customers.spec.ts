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
          },
          {
            id: customersMock[1].id.value,
            name: customersMock[1].name,
            email: customersMock[1].email,
            phone: customersMock[1].phone,
          },
        ],
      })

      const result = await sut.findAll()

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
        const expectedQuery = queries.findAll + " AND name LIKE '%test%'"
        await sut.findAll({ name: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(expectedQuery)
      })

      it('should add email filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })
        const expectedQuery = queries.findAll + " AND email LIKE '%test%'"
        await sut.findAll({ email: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(expectedQuery)
      })

      it('should add phone filter to query', async () => {
        connectionMock.executeQuery.mockResolvedValueOnce({
          rows: [],
        })
        const expectedQuery = queries.findAll + " AND phone LIKE '%test%'"
        await sut.findAll({ phone: 'test' })

        expect(connectionMock.executeQuery).toHaveBeenCalledWith(expectedQuery)
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
})
