// src/server/db.ts
import 'server-only'

import { PrismaClient } from '@prisma/client'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'

/**
 * Prisma Client singleton
 *
 * In development, we use a global variable to prevent exhausting database connections
 * during hot reloads. In production, we create a single instance.
 *
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  })

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Log database connection on first query
prisma.$connect().then(() => {
  logger.info('Database connected', {
    provider: 'sqlite',
    nodeEnv: env.NODE_ENV,
  })
})

/**
 * Helper to safely disconnect Prisma (useful for testing)
 */
export async function disconnectDatabase() {
  await prisma.$disconnect()
  logger.info('Database disconnected')
}
