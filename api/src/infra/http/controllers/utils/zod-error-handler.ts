export class ZodErrorHandler {
  static getMessage(errorMessage: string) {
    console.log(JSON.parse(errorMessage))
    return JSON.parse(errorMessage)[0].message
  }
}
