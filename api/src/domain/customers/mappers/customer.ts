import { UniqueId } from '@/core/entities/unique-id'
import { Customer } from '../entities/customer'

interface CustomerObject {
  id: string
  name: string
  email: string
  phone: string
  xCoordinate: number
  yCoordinate: number
}

export class CustomerMapper {
  static toObject(customer: Customer): CustomerObject {
    return {
      id: customer.id.value,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      xCoordinate: customer.xCoordinate,
      yCoordinate: customer.yCoordinate,
    }
  }

  static toDomain({
    id,
    name,
    email,
    phone,
    xCoordinate,
    yCoordinate,
  }: CustomerObject): Customer {
    return Customer.create(
      {
        name,
        email,
        phone,
        xCoordinate,
        yCoordinate,
      },
      new UniqueId(id),
    )
  }
}
