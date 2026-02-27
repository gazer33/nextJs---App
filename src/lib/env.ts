// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Session & Auth
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),
  SESSION_MAX_AGE: z.coerce.number().int().positive().default(604800), // 7 days

  // App
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Security
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),

  // Rate Limiting
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000), // 1 minute
})

export type Env = z.infer<typeof envSchema>

/**
 * Validates and returns environment variables.
 * This should only be called on the server side.
 *
 * @throws {Error} If environment validation fails
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten())
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

// Singleton pattern - validate once at module load
let cachedEnv: Env | null = null

export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv
  }

  cachedEnv = validateEnv()
  return cachedEnv
}

// Export typed env for server-side use
export const env = getEnv()
