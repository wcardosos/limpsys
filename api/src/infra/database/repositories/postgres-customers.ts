/* eslint-disable camelcase */
import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { Connection } from '../connections/connection'
import { Customer } from '@/domain/customers/entities/customer'
import { queries } from '../queries/customers'
import { CustomerDatabaseSchema } from '../schemas/customer'
import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { inject, injectable } from 'tsyringe'

type CustomerInsertValues = [string, string, string, string, number, number]

@injectable()
export class PostgresCustomersRepository implements CustomersRepository {
  constructor(@inject('Connection') private connection: Connection) {
    this.connection.connect()
  }

  async findAll(
    itemsPerPage: number,
    filters?: {
      name?: string
      email?: string
      phone?: string
      page?: number
    },
  ): Promise<Customer[]> {
    const page = filters?.page || 1
    const offset = (page - 1) * itemsPerPage

    const filtersQueryValues = [
      filters?.name ? `%${filters.name}%` : '%%',
      filters?.email ? `%${filters.email}%` : '%%',
      filters?.phone ? `%${filters.phone}%` : '%%',
      offset,
      itemsPerPage,
    ]

    const customerQueryResult = await this.connection.executeQuery(
      queries.findAll,
      filtersQueryValues,
    )

    return customerQueryResult.rows.map(
      ({
        id,
        name,
        email,
        phone,
        x_coordinate,
        y_coordinate,
      }: CustomerDatabaseSchema) =>
        CustomerMapper.toDomain({
          id,
          name,
          email,
          phone,
          xCoordinate: x_coordinate,
          yCoordinate: y_coordinate,
        }),
    )
  }

  async findById(id: string): Promise<Customer | null> {
    const customerQueryResult = await this.connection.executeQuery(
      queries.findById,
      [id],
    )

    if (customerQueryResult.rows.length === 0) return null

    return CustomerMapper.toDomain(customerQueryResult.rows[0])
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customerQueryResult = await this.connection.executeQuery(
      queries.findByEmail,
      [email],
    )

    if (customerQueryResult.rows.length === 0) return null

    return CustomerMapper.toDomain(customerQueryResult.rows[0])
  }

  async create(customer: Customer): Promise<void> {
    const customerInsertValues = this.composeCustomerInsertValues(customer)

    await this.connection.executeQuery(queries.create, customerInsertValues)
  }

  async count(): Promise<number> {
    const countQueryResult = await this.connection.executeQuery(queries.count)

    const count = parseInt(countQueryResult.rows[0].count)

    return count
  }

  async delete(id: string): Promise<void> {
    await this.connection.executeQuery(queries.delete, [id])
  }

  private composeCustomerInsertValues(
    customer: Customer,
  ): CustomerInsertValues {
    return [
      customer.id.value,
      customer.name,
      customer.email,
      customer.phone,
      customer.xCoordinate,
      customer.yCoordinate,
    ]
  }
}
