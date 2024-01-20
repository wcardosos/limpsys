import { Entity } from '@/core/entities/entity'
import { UniqueId } from '@/core/entities/unique-id'

export interface RouteCustomerProps {
  name: string
  xCoordinate: number
  yCoordinate: number
}

export class RouteCustomer extends Entity<RouteCustomerProps> {
  get name() {
    return this.props.name
  }

  get xCoordinate() {
    return this.props.xCoordinate
  }

  get yCoordinate() {
    return this.props.yCoordinate
  }

  static create(props: RouteCustomerProps, id?: UniqueId) {
    return new RouteCustomer(props, id)
  }
}
