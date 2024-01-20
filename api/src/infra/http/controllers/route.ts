import { RouteCustomerMapper } from '@/domain/route/mappers/customer'
import { CalculateBetterRouteUseCase } from '@/domain/route/use-cases/calculate-better-route'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RouteController {
  constructor(
    @inject(CalculateBetterRouteUseCase)
    private calculateBetterRouteUseCase: CalculateBetterRouteUseCase,
  ) {}

  async calculate(request: Request, response: Response, next: NextFunction) {
    try {
      const { route } = await this.calculateBetterRouteUseCase.execute()

      return response.json(
        route.map((customer) => RouteCustomerMapper.toObject(customer)),
      )
    } catch (error) {
      next(error)
    }
  }
}
