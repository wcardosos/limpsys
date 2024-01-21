import { DeleteCustomerUseCase } from '@/domain/customers/use-cases/delete-customer'
import { makeCustomersRepository } from '../../../utils/factories/repositories/make-customers'
import { makeCustomer } from '../../../utils/factories/entities/make-customer'
import { CustomerNotFound } from '@/domain/customers/errors/customer-not-found'

describe('Use case: DeleteCustomer', () => {
  let sut: DeleteCustomerUseCase

  const customersRepositoryMock = makeCustomersRepository()

  beforeEach(() => {
    sut = new DeleteCustomerUseCase(customersRepositoryMock)

    vi.resetAllMocks()
  })

  describe('execute', () => {
    const idMock = 'id'

    it('should delete a customer', async () => {
      customersRepositoryMock.findById.mockResolvedValueOnce(makeCustomer())

      await sut.execute({ id: idMock })

      expect(customersRepositoryMock.delete).toHaveBeenCalledWith(idMock)
    })

    it('should throws an error when the customers does not exists', async () => {
      customersRepositoryMock.findById.mockResolvedValueOnce(null)

      expect(
        async () => await sut.execute({ id: idMock }),
      ).rejects.toThrowError(CustomerNotFound)
    })
  })
})
