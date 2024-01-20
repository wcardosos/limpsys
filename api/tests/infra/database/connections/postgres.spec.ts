import { PostgresConnection } from '@/infra/database/connections/postgres'
import { Pool } from 'pg'
import { Mock } from 'vitest'

vi.mock('pg', () => {
  const Pool = vi.fn()
  Pool.prototype.connect = vi.fn()
  Pool.prototype.query = vi.fn()
  Pool.prototype.end = vi.fn()

  return { Pool }
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

      expect(Pool.prototype.connect).toHaveBeenCalledOnce()
    })
  })

  describe('disconnect', () => {
    it('should disconnect to database', () => {
      sut.disconnect()

      expect(Pool.prototype.end).toHaveBeenCalledOnce()
    })
  })

  describe('executeQuery', () => {
    const queryMock = 'query mock'

    it('should execute the query provided', async () => {
      // eslint-disable-next-line prettier/prettier
      (Pool.prototype.query as Mock).mockResolvedValueOnce('query result')
      const result = await sut.executeQuery(queryMock)

      expect(Pool.prototype.query).toHaveBeenCalledWith(queryMock, undefined)
      expect(result).toBe('query result')
    })

    it('should execute the query provided with the passed values', async () => {
      // eslint-disable-next-line prettier/prettier
      (Pool.prototype.query as Mock).mockResolvedValueOnce('query result with values')
      const valuesMock = ['value 1', 'value 2']

      const result = await sut.executeQuery(queryMock, valuesMock)

      expect(Pool.prototype.query).toHaveBeenCalledWith(queryMock, valuesMock)
      expect(result).toBe('query result with values')
    })
  })
})
