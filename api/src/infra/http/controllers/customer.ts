import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CustomerController {
  constructor(
    @inject(ListAllCustomersUseCase)
    private listAllCustomersUseCase: ListAllCustomersUseCase,
  ) {}

  async index(request: Request, response: Response) {
    const { customers } = await this.listAllCustomersUseCase.execute()

    return response
      .json(customers.map((customer) => CustomerMapper.toObject(customer)))
      .end()
  }
}
