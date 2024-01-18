import { UniqueId } from '@/core/entities/unique-id'
import { Customer, CustomerProps } from '@/domain/customers/entities/customer'
import { faker } from '@faker-js/faker'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueId,
) {
  return Customer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )
}
