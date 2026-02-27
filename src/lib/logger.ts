// src/lib/logger.ts
import { env } from './env'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment = env.NODE_ENV === 'development'

  /**
   * Format log message with context
   */
  private format(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(this.format('debug', message, context))
    }
  }

  info(message: string, context?: LogContext) {
    console.log(this.format('info', message, context))
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.format('warn', message, context))
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorContext = {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
    }
    console.error(this.format('error', message, errorContext))
  }
}

export const logger = new Logger()
