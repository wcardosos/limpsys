/* eslint-disable prettier/prettier */
import { AxiosGateway } from '@/infra/gateways/axios'
import { Axios } from 'axios'

describe('Gateway: Axios', () => {
  let sut: AxiosGateway

  const endpointMock = ''

  beforeEach(() => {
    sut = new AxiosGateway(endpointMock)
  })

  describe('get', () => {
    const getAxiosSpy = vi.spyOn(Axios.prototype, 'get')
  
    it('should make a get request and return the response data', async () => {
      getAxiosSpy.mockResolvedValueOnce({ data: { test: 'success' } })
      const urlMock = 'url'

      const result = await sut.get(urlMock)

      expect(getAxiosSpy).toHaveBeenCalledOnce()
      expect(getAxiosSpy).toHaveBeenCalledWith('url')
      expect(result).toStrictEqual({ test: 'success' })
    })
  })
})
