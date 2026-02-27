// src/server/utils/action-wrapper.ts
import 'server-only'

import { type ActionResult, toActionError } from '@/lib/errors'
import { logger } from '@/lib/logger'

/**
 * Wrapper for server actions that provides:
 * - Consistent error handling
 * - Logging
 * - Type-safe results
 *
 * @example
 * export const createProject = actionWrapper(async (input: CreateProjectInput) => {
 *   const validated = createProjectSchema.parse(input)
 *   // ... logic
 *   return { id: '123', name: validated.name }
 * })
 */
export function actionWrapper<TInput, TOutput>(
  handler: (input: TInput) => Promise<TOutput>,
  options?: {
    actionName?: string
    logInput?: boolean
  }
) {
  return async (input: TInput): Promise<ActionResult<TOutput>> => {
    const actionName = options?.actionName || handler.name || 'anonymous-action'

    try {
      if (options?.logInput) {
        logger.debug(`[${actionName}] Input`, { input })
      }

      const result = await handler(input)

      logger.debug(`[${actionName}] Success`)

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      logger.error(`[${actionName}] Error`, error, {
        input: options?.logInput ? input : undefined,
      })

      return toActionError(error)
    }
  }
}

/**
 * Type guard to check if action result is successful
 */
export function isActionSuccess<T>(
  result: ActionResult<T>
): result is ActionResult<T> & { success: true } {
  return result.success === true
}
