import { CountCustomersUseCase } from '@/domain/customers/use-cases/count-customers'
import { makeCustomersRepository } from 'tests/utils/factories/repositories/make-customers'

describe('Use case: CountCustomers', () => {
  describe('execute', () => {
    const customersRepositoryMock = makeCustomersRepository()
    const sut = new CountCustomersUseCase(customersRepositoryMock)

    it('should return the customers count', async () => {
      customersRepositoryMock.count.mockResolvedValueOnce(5)

      const { count } = await sut.execute()

      expect(count).toBe(5)
    })
  })
})
