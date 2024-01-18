export class ConflictError extends Error {
  private _code: number

  constructor(message: string) {
    super(message)
    this._code = 409
  }

  get code() {
    return this._code
  }
}
