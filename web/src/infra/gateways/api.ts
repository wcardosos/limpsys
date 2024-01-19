/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiGateway {
  get(url: string): Promise<any>
}
