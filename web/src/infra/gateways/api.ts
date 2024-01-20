/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class ApiGateway {
  abstract get(url: string): Promise<any>
  abstract post(url: string, body: any): Promise<any>
}
