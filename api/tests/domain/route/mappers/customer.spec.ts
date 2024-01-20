import { RouteCustomerMapper } from '@/domain/route/mappers/customer'
import { makeRouteCustomer } from 'tests/utils/factories/entities/make-route-customer'

describe('Mapper: Customer', () => {
  const customerMock = makeRouteCustomer()
  const customerAsObject = {
    id: customerMock.id.value,
    name: customerMock.name,
    xCoordinate: customerMock.xCoordinate,
    yCoordinate: customerMock.yCoordinate,
  }

  describe('toObject', () => {
    it('should map a domain customer to object', () => {
      const result = RouteCustomerMapper.toObject(customerMock)

      expect(result).toStrictEqual(customerAsObject)
    })
  })

  describe('toDomain', () => {
    it('should map a customer object to domain', () => {
      const result = RouteCustomerMapper.toDomain(customerAsObject)

      expect(result).toEqual(customerMock)
    })
  })
})
