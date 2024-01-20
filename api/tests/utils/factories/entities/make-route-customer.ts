import { UniqueId } from '@/core/entities/unique-id'
import {
  RouteCustomer,
  RouteCustomerProps,
} from '@/domain/route/entities/customer'
import { faker } from '@faker-js/faker'

export function makeRouteCustomer(
  override: Partial<RouteCustomerProps> = {},
  id?: UniqueId,
) {
  return RouteCustomer.create(
    {
      name: faker.person.fullName(),
      xCoordinate: faker.number.int(),
      yCoordinate: faker.number.int(),
      ...override,
    },
    id,
  )
}
