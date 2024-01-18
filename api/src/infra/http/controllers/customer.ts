import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { CreateCustomerUseCase } from '@/domain/customers/use-cases/create-customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { createCustomerBodySchema } from './body-schemas/customer'

@injectable()
export class CustomerController {
  constructor(
    @inject(ListAllCustomersUseCase)
    private listAllCustomersUseCase: ListAllCustomersUseCase,
    @inject(CreateCustomerUseCase)
    private createCustomerUseCase: CreateCustomerUseCase,
  ) {}

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { customers } = await this.listAllCustomersUseCase.execute()

      return response.json(
        customers.map((customer) => CustomerMapper.toObject(customer)),
      )
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, phone } = createCustomerBodySchema.parse(
        request.body,
      )

      await this.createCustomerUseCase.execute({ name, email, phone })

      return response.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }
}
