import { inject, injectable } from 'tsyringe'
import { CustomersRepository } from '../repositories/customers'

interface CountCustomersUseCaseResponse {
  count: number
}

@injectable()
export class CountCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute(): Promise<CountCustomersUseCaseResponse> {
    const count = await this.customersRepository.count()

    return { count }
  }
}
