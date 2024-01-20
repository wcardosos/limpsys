import { CustomersRepository } from '@/domain/customers/repositories/customers'
import { CountCustomersUseCase } from '@/domain/customers/use-cases/count-customers'
import { CreateCustomerUseCase } from '@/domain/customers/use-cases/create-customer'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { RouteCustomersRepository } from '@/domain/route/repositories/customers'
import { CalculateBetterRouteUseCase } from '@/domain/route/use-cases/calculate-better-route'
import { Connection } from '@/infra/database/connections/connection'
import { PostgresConnection } from '@/infra/database/connections/postgres'
import { PostgresCustomersRepository } from '@/infra/database/repositories/postgres-customers'
import { PostgresRouteCustomersRepository } from '@/infra/database/repositories/postgres-route-customers'
import { CustomerController } from '@/infra/http/controllers/customer'
import { RouteController } from '@/infra/http/controllers/route'
import { container } from 'tsyringe'

// Connections
container.registerSingleton<Connection>('Connection', PostgresConnection)

// Repositories
container.registerSingleton<CustomersRepository>(
  'CustomersRepository',
  PostgresCustomersRepository,
)
container.register<RouteCustomersRepository>(
  'RouteCustomersRepository',
  PostgresRouteCustomersRepository,
)

// Use cases
container.registerSingleton(ListAllCustomersUseCase)
container.registerSingleton(CreateCustomerUseCase)
container.registerSingleton(CountCustomersUseCase)
container.registerSingleton(CalculateBetterRouteUseCase)

// Controllers
container.registerSingleton(CustomerController)
container.registerSingleton(RouteController)
