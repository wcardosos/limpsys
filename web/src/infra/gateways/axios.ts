import axios, { Axios } from 'axios'
import { ApiGateway } from './api'

export class AxiosGateway extends ApiGateway {
  protected client: Axios

  constructor(baseUrl: string) {
    super()
    this.client = axios.create({
      baseURL: baseUrl,
    })
  }

  async get(resource: string) {
    const { data } = await this.client.get(resource)

    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(resource: string, body: any) {
    return this.client.post(resource, body)
  }
}
