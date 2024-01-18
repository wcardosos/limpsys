import { Entity } from '@/core/entities/entity'
import { UniqueId } from '@/core/entities/unique-id'

export interface CustomerProps {
  name: string
  email: string
  phone: string
}

export class Customer extends Entity<CustomerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  static create(props: CustomerProps, id?: UniqueId) {
    return new Customer(props, id)
  }
}
