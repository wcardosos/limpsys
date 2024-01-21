import { inject, injectable } from 'tsyringe'
import { CustomersRepository } from '../repositories/customers'
import { CustomerNotFound } from '../errors/customer-not-found'

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
    const customer = await this.customersRepository.findById(id)

    if (!customer) throw new CustomerNotFound(id)

    return this.customersRepository.delete(id)
  }
}
