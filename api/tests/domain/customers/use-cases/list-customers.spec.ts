import { Customer } from '@/domain/customers/entities/customer'
import { ListCustomersUseCase } from '@/domain/customers/use-cases/list-customers'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'
import { makeCustomersRepository } from 'tests/utils/factories/repositories/make-customers'

describe('Use case: ListAllCustomers', () => {
  let sut: ListCustomersUseCase

  const customersMock = [makeCustomer(), makeCustomer(), makeCustomer()]
  const customersRepositoryMock = makeCustomersRepository()
  customersRepositoryMock.findAll.mockResolvedValue(customersMock)
  customersRepositoryMock.count.mockResolvedValue(customersMock.length)

  beforeEach(() => {
    sut = new ListCustomersUseCase(customersRepositoryMock)
  })

  describe('execute', () => {
    it('should find customers and return pagination info', async () => {
      const expectedItemsPerPage = 5
      const filtersMock = {
        name: 'name',
        email: 'email',
        phone: 'phone',
        page: 1,
      }
      const result = await sut.execute({
        filters: filtersMock,
      })

      expect(customersRepositoryMock.findAll).toHaveBeenCalledOnce()
      expect(customersRepositoryMock.findAll).toHaveBeenCalledWith(
        expectedItemsPerPage,
        filtersMock,
      )
      expect(result.customers).toBeInstanceOf(Array<Customer>)
      expect(result.customers).toHaveLength(3)
      expect(result.hasNextPage).toBeFalsy()
      expect(result.hasPreviousPage).toBeFalsy()
      expect(result.currentPage).toBe(1)
    })
  })
})
