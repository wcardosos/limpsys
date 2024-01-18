import { PostgresConnection } from '@/infra/database/connections/postgres'
import { Client } from 'pg'
import { Mock } from 'vitest'

vi.mock('pg', () => {
  const Client = vi.fn()
  Client.prototype.connect = vi.fn()
  Client.prototype.query = vi.fn()
  Client.prototype.end = vi.fn()

  return { Client }
})

describe('Connection: Postgres', () => {
  let sut: PostgresConnection

  beforeEach(() => {
    sut = new PostgresConnection()

    vi.resetAllMocks()
  })

  describe('connect', () => {
    it('should connect to database', () => {
      sut.connect()

      expect(Client.prototype.connect).toHaveBeenCalledOnce()
    })
  })

  describe('disconnect', () => {
    it('should disconnect to database', () => {
      sut.disconnect()

      expect(Client.prototype.end).toHaveBeenCalledOnce()
    })
  })

  describe('executeQuery', () => {
    it('should execute the query provided', async () => {
      // eslint-disable-next-line prettier/prettier
      (Client.prototype.query as Mock).mockResolvedValueOnce('query result')
      const queryMock = 'query mock'

      const result = await sut.executeQuery(queryMock)

      expect(Client.prototype.query).toHaveBeenCalledWith(queryMock)
      expect(result).toBe('query result')
    })
  })
})
