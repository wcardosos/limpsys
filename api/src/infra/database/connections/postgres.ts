import { Pool } from 'pg'
import { Connection } from './connection'
import { injectable } from 'tsyringe'

@injectable()
export class PostgresConnection implements Connection {
  private client: Pool

  constructor() {
    this.client = new Pool({
      host: 'postgres',
      port: 5432,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    })
  }

  connect() {
    this.client.connect()
  }

  disconnect() {
    this.client.end()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executeQuery(query: string, values?: any[]) {
    return this.client.query(query, values)
  }
}
