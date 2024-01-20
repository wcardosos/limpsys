/* eslint-disable prettier/prettier */
import { AxiosGateway } from '@/infra/gateways/axios'
import { Axios } from 'axios'

describe('Gateway: Axios', () => {
  let sut: AxiosGateway

  const endpointMock = 'endpoint'

  beforeEach(() => {
    sut = new AxiosGateway(endpointMock)

    vi.resetAllMocks()
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

  describe('post', () => {
    const postAxiosSpy = vi.spyOn(Axios.prototype, 'post')

    it('should make a post request with the body provided', async () => {
      const urlMock = 'url'

      await sut.post(urlMock, { test: 'success' })

      expect(postAxiosSpy).toHaveBeenCalledOnce()
      expect(postAxiosSpy).toHaveBeenCalledWith('url', { test: 'success' })
    })
  })
})
