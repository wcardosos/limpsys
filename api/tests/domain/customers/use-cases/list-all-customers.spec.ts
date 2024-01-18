import { Customer } from '@/domain/customers/entities/customer'
import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'

describe('Use case: ListAllCustomers', () => {
  let sut: ListAllCustomersUseCase

  const allCustomersMock = [makeCustomer(), makeCustomer(), makeCustomer()]
  const customersRepositoryMock = {
    findAll: vi.fn().mockResolvedValue(allCustomersMock),
  } as CustomersRepository

  beforeEach(() => {
    sut = new ListAllCustomersUseCase(customersRepositoryMock)
  })

  describe('execute', () => {
    it('should find all customers', async () => {
      const result = await sut.execute()

      expect(customersRepositoryMock.findAll).toHaveBeenCalledOnce()
      expect(result.customers).toBeInstanceOf(Array<Customer>)
      expect(result.customers).toHaveLength(3)
    })
  })
})
