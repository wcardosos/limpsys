import { CustomersRepository } from '@/domain/customers/repositories/customers'

export function makeCustomersRepository() {
  const customersRepositoryMock = {
    findAll: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
  } satisfies CustomersRepository

  return customersRepositoryMock
}
