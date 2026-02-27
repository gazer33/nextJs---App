// src/lib/errors.ts

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

/**
 * Validation error (400)
 */
export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

/**
 * Authentication error (401)
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR')
    this.name = 'AuthenticationError'
  }
}

/**
 * Authorization error (403)
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Permission denied') {
    super(message, 403, 'AUTHORIZATION_ERROR')
    this.name = 'AuthorizationError'
  }
}

/**
 * Not found error (404)
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

/**
 * Rate limit error (429)
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR')
    this.name = 'RateLimitError'
  }
}

/**
 * Standardized error response for server actions
 */
export type ActionError = {
  success: false
  error: {
    message: string
    code?: string
    field?: string
  }
}

/**
 * Standardized success response for server actions
 */
export type ActionSuccess<T = void> = {
  success: true
  data: T
}

/**
 * Generic action result type
 */
export type ActionResult<T = void> = ActionSuccess<T> | ActionError

/**
 * Convert error to standardized action error response
 */
export function toActionError(error: unknown): ActionError {
  if (error instanceof ValidationError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        field: error.field,
      },
    }
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
      },
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    }
  }

  return {
    success: false,
    error: {
      message: 'An unexpected error occurred',
    },
  }
}
