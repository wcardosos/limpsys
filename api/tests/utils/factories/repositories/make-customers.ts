import { CustomersRepository } from '@/domain/customers/repositories/customers'

export function makeCustomersRepository() {
  const customersRepositoryMock = {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
    delete: vi.fn(),
  } satisfies CustomersRepository

  return customersRepositoryMock
}
