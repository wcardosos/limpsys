import { UniqueId } from '@/core/entities/unique-id'
import { Customer } from '../entities/customer'

interface CustomerObject {
  id: string
  name: string
  email: string
  phone: string
}

export class CustomerMapper {
  static toObject(customer: Customer): CustomerObject {
    return {
      id: customer.id.value,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    }
  }

  static toDomain({ id, name, email, phone }: CustomerObject): Customer {
    return Customer.create(
      {
        name,
        email,
        phone,
      },
      new UniqueId(id),
    )
  }
}
