import { ApiError } from '@/core/errors/api-error'
import { NextFunction, Request, Response } from 'express'

export function catchAllErrors(
  error: Error & Partial<ApiError>,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal server error'

  console.error(error)

  return response.status(statusCode).json({ message })
}
