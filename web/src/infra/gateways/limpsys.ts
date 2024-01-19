import { AxiosGateway } from './axios'

export class LimpsysGateway extends AxiosGateway {
  constructor() {
    super('http://localhost:3333')
  }
}
