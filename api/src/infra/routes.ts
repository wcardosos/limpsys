import express from 'express'
import { PostgresConnection } from './database/connections/postgres'
import { PostgresCustomersRepository } from './database/repositories/postgres-customers'
import { ListAllCustomersUseCase } from '@/domain/customers/use-cases/list-all-customers'
import { CustomerMapper } from '@/domain/customers/mappers/customer'

export const routes = express.Router()

routes.get('/', (request, response) => {
  return response.send('Welcome to limpsys API!')
})

routes.get('/customers', async (request, response) => {
  const connection = new PostgresConnection()
  const customersRepository = new PostgresCustomersRepository(connection)
  const listAllCustomersUseCase = new ListAllCustomersUseCase(
    customersRepository,
  )

  const { customers } = await listAllCustomersUseCase.execute()

  return response
    .json(customers.map((customer) => CustomerMapper.toObject(customer)))
    .send()
})
