/* eslint-disable camelcase */
import { RouteCustomersRepository } from '@/domain/route/repositories/customers'
import { Connection } from '../connections/connection'
import { RouteCustomer } from '@/domain/route/entities/customer'
import { queries } from '../queries/route'
import { CustomerDatabaseSchema } from '../schemas/customer'
import { RouteCustomerMapper } from '@/domain/route/mappers/customer'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PostgresRouteCustomersRepository
  implements RouteCustomersRepository
{
  constructor(@inject('Connection') private connection: Connection) {
    this.connection.connect()
  }

  async findAll(): Promise<RouteCustomer[]> {
    const findQueryResult = await this.connection.executeQuery(queries.findAll)

    return findQueryResult.rows.map(
      ({ id, name, x_coordinate, y_coordinate }: CustomerDatabaseSchema) =>
        RouteCustomerMapper.toDomain({
          id,
          name,
          xCoordinate: x_coordinate,
          yCoordinate: y_coordinate,
        }),
    )
  }
}
