export class ApiError extends Error {
  private _statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this._statusCode = statusCode
  }

  get statusCode() {
    return this._statusCode
  }
}
