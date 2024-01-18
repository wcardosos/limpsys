import { CustomerMapper } from '@/domain/customers/mappers/customer'
import { makeCustomer } from 'tests/utils/factories/entities/make-customer'

describe('Mapper: Customer', () => {
  const customerMock = makeCustomer()
  const customerAsObject = {
    id: customerMock.id.value,
    name: customerMock.name,
    email: customerMock.email,
    phone: customerMock.phone,
  }

  describe('toObject', () => {
    it('should map a domain customer to object', () => {
      const result = CustomerMapper.toObject(customerMock)

      expect(result).toStrictEqual(customerAsObject)
    })
  })

  describe('toDomain', () => {
    it('should map a customer object to domain', () => {
      const result = CustomerMapper.toDomain(customerAsObject)

      expect(result).toEqual(customerMock)
    })
  })
})
