import { Customer } from '@/domain/customers/entities/customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'
import { makeCustomersRepository } from 'tests/utils/factories/repositories/make-customers'

describe('Use case: ListAllCustomers', () => {
  let sut: ListAllCustomersUseCase

  const allCustomersMock = [makeCustomer(), makeCustomer(), makeCustomer()]
  const customersRepositoryMock = makeCustomersRepository()
  customersRepositoryMock.findAll.mockResolvedValue(allCustomersMock)

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
