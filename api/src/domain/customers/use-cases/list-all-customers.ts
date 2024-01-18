import { inject, injectable } from 'tsyringe'
import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'

interface ListAllCustomerUseCaseResponse {
  customers: Customer[]
}

@injectable()
export class ListAllCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute(): Promise<ListAllCustomerUseCaseResponse> {
    const customers = await this.customersRepository.findAll()

    return { customers }
  }
}
