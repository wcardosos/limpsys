import { Entity } from '@/core/entities/entity'
import { UniqueId } from '@/core/entities/unique-id'

export interface CustomerProps {
  name: string
  email: string
  phone: string
  xCoordinate: number
  yCoordinate: number
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

  get xCoordinate() {
    return this.props.xCoordinate
  }

  get yCoordinate() {
    return this.props.yCoordinate
  }

  static create(props: CustomerProps, id?: UniqueId) {
    return new Customer(props, id)
  }
}
