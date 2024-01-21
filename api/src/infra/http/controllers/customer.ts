import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { CreateCustomerUseCase } from '@/domain/customers/use-cases/create-customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { createCustomerBodySchema } from './schemas/customer/body'
import { ValidationError } from '@/core/errors/validation'
import { ZodErrorHandler } from './utils/zod-error-handler'
import { listAllCustomersQuerySchema } from './schemas/customer/query'
import { CountCustomersUseCase } from '@/domain/customers/use-cases/count-customers'
import { DeleteCustomerUseCase } from '@/domain/customers/use-cases/delete-customer'

@injectable()
export class CustomerController {
  constructor(
    @inject(ListAllCustomersUseCase)
    private listAllCustomersUseCase: ListAllCustomersUseCase,
    @inject(CreateCustomerUseCase)
    private createCustomerUseCase: CreateCustomerUseCase,
    @inject(CountCustomersUseCase)
    private countCustomersUseCase: CountCustomersUseCase,
    @inject(DeleteCustomerUseCase)
    private deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, phone, page } = listAllCustomersQuerySchema.parse(
        request.query,
      )
      const { customers } = await this.listAllCustomersUseCase.execute({
        filters: { name, email, phone, page },
      })

      return response.json(
        customers.map((customer) => CustomerMapper.toObject(customer)),
      )
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const result = createCustomerBodySchema.safeParse(request.body)

      if (!result.success)
        throw new ValidationError(
          ZodErrorHandler.getMessage(result.error.message),
        )

      const { name, email, phone, xCoordinate, yCoordinate } = result.data

      await this.createCustomerUseCase.execute({
        name,
        email,
        phone,
        xCoordinate,
        yCoordinate,
      })

      return response.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }

  async count(request: Request, response: Response, next: NextFunction) {
    try {
      const { count } = await this.countCustomersUseCase.execute()

      return response.json({ count })
    } catch (error) {
      next(error)
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params

      await this.deleteCustomerUseCase.execute({ id })

      return response.json(200)
    } catch (error) {
      next(error)
    }
  }
}
