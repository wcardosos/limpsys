import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'

interface ListAllCustomerUseCaseResponse {
  customers: Customer[]
}

export class ListAllCustomersUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(): Promise<ListAllCustomerUseCaseResponse> {
    const customers = await this.customersRepository.findAll()

    return { customers }
  }
}
