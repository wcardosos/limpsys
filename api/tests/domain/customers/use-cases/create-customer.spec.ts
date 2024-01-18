import { Customer } from '@/domain/customers/entities/customer'
import { CustomerAlreadyExists } from '@/domain/customers/errors/customer-already-exists'
import { CreateCustomerUseCase } from '@/domain/customers/use-cases/create-customer'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'
import { makeCustomersRepository } from 'tests/utils/factories/repositories/make-customers'

describe('Use case: CreateCustomer', () => {
  let sut: CreateCustomerUseCase

  const customersRepositoryMock = makeCustomersRepository()

  beforeEach(() => {
    sut = new CreateCustomerUseCase(customersRepositoryMock)

    vi.resetAllMocks()
  })

  describe('execute', () => {
    const customerMock = makeCustomer()
    const customerInfoMock = {
      name: customerMock.name,
      email: customerMock.email,
      phone: customerMock.phone,
    }

    it('should create a customer', async () => {
      const result = await sut.execute(customerInfoMock)

      expect(result.customer).toBeInstanceOf(Customer)
      expect(result.customer.name).toBe(customerInfoMock.name)
      expect(result.customer.email).toBe(customerInfoMock.email)
      expect(result.customer.phone).toBe(customerInfoMock.phone)
    })

    it('should throws an error when exists a customer with same email', () => {
      customersRepositoryMock.findByEmail.mockResolvedValueOnce(customerMock)

      expect(
        async () => await sut.execute(customerInfoMock),
      ).rejects.toThrowError(CustomerAlreadyExists)
    })
  })
})
