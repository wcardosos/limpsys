import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { Connection } from '../connections/connection'
import { Customer } from '@/domain/customers/entities/customer'
import { queries } from '../queries/customers'
import { CustomerDatabaseSchema } from '../schemas/customer'
import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { inject, injectable } from 'tsyringe'

type CustomerInsertValues = [string, string, string, string]

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
      findQueryStatements.push(`AND name LIKE '${filters.name}%'`)
    if (filters?.email)
      findQueryStatements.push(`AND email LIKE '${filters.email}%'`)
    if (filters?.phone)
      findQueryStatements.push(`AND phone LIKE '${filters.phone}%'`)

    const customerQueryResult = await this.connection.executeQuery(
      findQueryStatements.join(' '),
    )

    return customerQueryResult.rows.map((result: CustomerDatabaseSchema) =>
      CustomerMapper.toDomain(result),
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

  private composeCustomerInsertValues(
    customer: Customer,
  ): CustomerInsertValues {
    return [customer.id.value, customer.name, customer.email, customer.phone]
  }
}
