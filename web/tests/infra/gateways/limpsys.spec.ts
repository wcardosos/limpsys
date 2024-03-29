/* eslint-disable prettier/prettier */
import { Customer } from '@/features/customers/entities/customer'
import { LimpsysGateway } from '@/infra/gateways/limpsys'

describe('Gateway: Axios', () => {
  let sut: LimpsysGateway

  beforeEach(() => {
    sut = new LimpsysGateway()

    vi.resetAllMocks()
  })
  
  const getSpy = vi.spyOn(LimpsysGateway.prototype, 'get')
  const postSpy = vi.spyOn(LimpsysGateway.prototype, 'post')
  const deleteSpy = vi.spyOn(LimpsysGateway.prototype, 'delete')

  describe('fetchCustomers', () => {
    it('should fetch all customers', async () => {
      getSpy.mockResolvedValueOnce(['customer 1', 'customer 2'])

      const result = await sut.fetchCustomers()

      expect(getSpy).toHaveBeenCalledOnce()
      expect(getSpy).toHaveBeenCalledWith('/customers')
      expect(result).toStrictEqual(['customer 1', 'customer 2'])
    })
  })

  describe('fetchCustomersCount', () => {
    it('should fetch the customers registered count', async () => {
      getSpy.mockResolvedValueOnce({ count: 1 })

      const result = await sut.fetchCustomersCount()

      expect(getSpy).toHaveBeenCalledOnce()
      expect(getSpy).toHaveBeenCalledWith('/customers/count')
      expect(result).toBe(1)
    })
  })

  describe('filterCustomers', () => {
    it('should filter customers from a query', async () => {
      getSpy.mockResolvedValueOnce([])
      const queryParamsMock = '?query=param'

      const result = await sut.filterCustomers(queryParamsMock)

      expect(getSpy).toHaveBeenCalledOnce()
      expect(getSpy).toHaveBeenCalledWith('/customers?query=param')
      expect(result).toEqual([])
    })
  })

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const customerMock: Customer = {
        name: 'Wagner Cardoso',
        email: 'wagner@limpsys.com',
        phone: '11111111111',
        xCoordinate: 1,
        yCoordinate: 2
      }

      await sut.createCustomer(customerMock)

      expect(postSpy).toHaveBeenCalledOnce()
      expect(postSpy).toHaveBeenCalledWith('/customers', customerMock)
    })
  })

  describe('deleteCustomer', () => {
    it('should delete a customer', async () => {
      const idMock = 'id mock'
      await sut.deleteCustomer(idMock)

      expect(deleteSpy).toHaveBeenCalledOnce()
      expect(deleteSpy).toHaveBeenCalledWith(`/customers/${idMock}`)
    })
  })

  describe('calculateRoute', () => {
    it('should calculate the route', async () => {
      getSpy.mockResolvedValueOnce(['customer 1', 'customer 2'])

      const result = await sut.calculateRoute()

      expect(getSpy).toHaveBeenCalledOnce()
      expect(getSpy).toHaveBeenCalledWith('/route')
      expect(result).toStrictEqual(['customer 1', 'customer 2'])
    })
  })
})
