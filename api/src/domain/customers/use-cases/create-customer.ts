import { Customer } from '../entities/customer'
import { CustomersRepository } from '../repositories/customers'
import { CustomerAlreadyExists } from '../errors/customer-already-exists'
import { injectable, inject } from 'tsyringe'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  phone: string
  xCoordinate: number
  yCoordinate: number
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    xCoordinate,
    yCoordinate,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerWithSameEmail =
      await this.customersRepository.findByEmail(email)

    if (customerWithSameEmail) throw new CustomerAlreadyExists(email)

    const customer = Customer.create({
      name,
      email,
      phone,
      xCoordinate,
      yCoordinate,
    })

    await this.customersRepository.create(customer)

    return { customer }
  }
}
