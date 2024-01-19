import axios, { Axios } from 'axios'
import { ApiGateway } from './api'

export class AxiosGateway implements ApiGateway {
  private client: Axios

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    })
  }

  async get(resource: string) {
    const { data } = await this.client.get(resource)

    return data
  }
}
