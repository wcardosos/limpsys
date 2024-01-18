import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { Connection } from '../connections/connection'
import { Customer } from '@/domain/customers/entities/customer'
import { queries } from '../queries/customers'
import { CustomerDatabaseSchema } from '../schemas/customer'
import { CustomerMapper } from '@/domain/customers/mappers/customer'

export class PostgresCustomersRepository implements CustomersRepository {
  constructor(private connection: Connection) {
    this.connection.connect()
  }

  async findAll(): Promise<Customer[]> {
    const customersData = await this.connection.executeQuery(queries.findAll)

    return customersData.rows.map((result: CustomerDatabaseSchema) =>
      CustomerMapper.toDomain(result),
    )
  }

  findByEmail(email: string): Promise<Customer | null> {
    return new Promise(() => null)
  }

  create(customer: Customer): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new Promise(() => {})
  }
}
