import { Client } from 'pg'
import { Connection } from './connection'

export class PostgresConnection implements Connection {
  private client: Client

  constructor() {
    this.client = new Client({
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

  executeQuery(query: string) {
    return this.client.query(query)
  }
}
