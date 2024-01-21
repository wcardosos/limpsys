import { inject, injectable } from 'tsyringe'
import { CustomersRepository } from '../repositories/customers'

interface DeleteCustomerUseCaseRequest {
  id: string
}

@injectable()
export class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ id }: DeleteCustomerUseCaseRequest): Promise<void> {
    return this.customersRepository.delete(id)
  }
}
