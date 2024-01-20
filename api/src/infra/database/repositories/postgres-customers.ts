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

  async findAll(filters?: {
    name?: string
    email?: string
    phone?: string
  }): Promise<Customer[]> {
    const findQueryStatements = [queries.findAll]

    if (filters?.name)
      findQueryStatements.push(`AND name LIKE '%${filters.name}%'`)
    if (filters?.email)
      findQueryStatements.push(`AND email LIKE '%${filters.email}%'`)
    if (filters?.phone)
      findQueryStatements.push(`AND phone LIKE '%${filters.phone}%'`)

    const customerQueryResult = await this.connection.executeQuery(
      findQueryStatements.join(' '),
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
