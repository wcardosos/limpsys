import { DeleteCustomerUseCase } from '@/domain/customers/use-cases/delete-customer'
import { makeCustomersRepository } from '../../../utils/factories/repositories/make-customers'

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
      await sut.execute({ id: idMock })

      expect(customersRepositoryMock.delete).toHaveBeenCalledWith(idMock)
    })
  })
})
