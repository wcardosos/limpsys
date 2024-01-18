/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Connection {
  connect(): void
  disconnect(): void
  executeQuery(query: string): Promise<any>
}
