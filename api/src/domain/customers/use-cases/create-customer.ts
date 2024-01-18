import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'
import { CustomerAlreadyExists } from '../errors/customer-already-exists'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  phone: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    email,
    phone,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerWithSameEmail =
      await this.customersRepository.findByEmail(email)

    if (customerWithSameEmail) throw new CustomerAlreadyExists(email)

    const customer = Customer.create({
      name,
      email,
      phone,
    })

    await this.customersRepository.create(customer)

    return { customer }
  }
}
