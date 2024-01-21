import { inject, injectable } from 'tsyringe'
import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'

interface ListAllCustomersUseCaseRequest {
  filters?: {
    name?: string
    email?: string
    phone?: string
    page?: number
  }
}

interface ListAllCustomerUseCaseResponse {
  customers: Customer[]
}

@injectable()
export class ListAllCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    filters,
  }: ListAllCustomersUseCaseRequest): Promise<ListAllCustomerUseCaseResponse> {
    const customers = await this.customersRepository.findAll(filters)

    return { customers }
  }
}
