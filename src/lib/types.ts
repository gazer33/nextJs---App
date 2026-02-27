// src/lib/types.ts
import { z } from 'zod'

/**
 * Project Status
 * SQLite doesn't support enums, so we use string with Zod validation
 */
export const ProjectStatusSchema = z.enum([
  'PLANNING',
  'ACTIVE',
  'COMPLETED',
  'ARCHIVED',
])
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>

/**
 * Task Status
 */
export const TaskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE'])
export type TaskStatus = z.infer<typeof TaskStatusSchema>

/**
 * Task Priority
 */
export const TaskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])
export type TaskPriority = z.infer<typeof TaskPrioritySchema>
