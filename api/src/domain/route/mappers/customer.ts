import { UniqueId } from '@/core/entities/unique-id'
import { RouteCustomer } from '../entities/customer'

interface RouteCustomerObject {
  id: string
  name: string
  xCoordinate: number
  yCoordinate: number
}

export class RouteCustomerMapper {
  static toObject(customer: RouteCustomer): RouteCustomerObject {
    return {
      id: customer.id.value,
      name: customer.name,
      xCoordinate: customer.xCoordinate,
      yCoordinate: customer.yCoordinate,
    }
  }

  static toDomain({
    id,
    name,
    xCoordinate,
    yCoordinate,
  }: RouteCustomerObject): RouteCustomer {
    return RouteCustomer.create(
      {
        name,
        xCoordinate,
        yCoordinate,
      },
      new UniqueId(id),
    )
  }
}
