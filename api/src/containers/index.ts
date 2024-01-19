import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { CountCustomersUseCase } from '@/domain/customers/use-cases/count-customers'
import { CreateCustomerUseCase } from '@/domain/customers/use-cases/create-customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { Connection } from '@/infra/database/connections/connection'
import { PostgresConnection } from '@/infra/database/connections/postgres'
import { PostgresCustomersRepository } from '@/infra/database/repositories/postgres-customers'
import { CustomerController } from '@/infra/http/controllers/customer'
import { container } from 'tsyringe'

// Connections
container.registerSingleton<Connection>('Connection', PostgresConnection)

// Repositories
container.registerSingleton<CustomersRepository>(
  'CustomersRepository',
  PostgresCustomersRepository,
)

// Use cases
container.registerSingleton(ListAllCustomersUseCase)
container.registerSingleton(CreateCustomerUseCase)
container.registerSingleton(CountCustomersUseCase)

// Controllers
container.registerSingleton(CustomerController)
