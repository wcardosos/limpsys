export class ZodErrorHandler {
  static getMessage(errorMessage: string) {
    return JSON.parse(errorMessage)[0].message
  }
}
