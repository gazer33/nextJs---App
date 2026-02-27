# Server Actions Conventions

This directory contains Next.js Server Actions organized by domain.

## Structure

```
src/server/actions/
├── auth/          # Authentication actions (login, logout, signup)
├── projects/      # Project CRUD actions
├── tasks/         # Task CRUD actions
└── README.md      # This file
```

## Conventions

### 1. File Organization

- One file per resource (e.g., `projects/create-project.ts`)
- Group related actions by domain folder
- Export actions as named exports

### 2. Action Structure

```typescript
'use server'

import { actionWrapper } from '@/server/utils/action-wrapper'
import { z } from 'zod'

// 1. Define input schema
const inputSchema = z.object({
  name: z.string().min(1).max(100),
})

type Input = z.infer<typeof inputSchema>

// 2. Define output type
type Output = {
  id: string
  name: string
}

// 3. Implement action with wrapper
export const createProject = actionWrapper<Input, Output>(
  async (input) => {
    // Validate input
    const validated = inputSchema.parse(input)

    // Business logic here
    // ...

    return {
      id: '123',
      name: validated.name,
    }
  },
  {
    actionName: 'createProject',
    logInput: false, // Set true for debugging
  }
)
```

### 3. Error Handling

Use standardized error classes from `@/lib/errors`:

```typescript
import { ValidationError, NotFoundError } from '@/lib/errors'

// Validation error
if (!valid) {
  throw new ValidationError('Invalid input', 'fieldName')
}

// Not found
if (!project) {
  throw new NotFoundError('Project')
}
```

The `actionWrapper` will automatically convert these to proper `ActionResult` responses.

### 4. Client Usage

```typescript
'use client'

import { createProject } from '@/server/actions/projects/create-project'

async function handleSubmit(data: FormData) {
  const result = await createProject({
    name: data.get('name') as string,
  })

  if (!result.success) {
    // Handle error
    toast.error(result.error.message)
    return
  }

  // Handle success
  toast.success('Project created!')
  console.log(result.data.id)
}
```

### 5. Security

- **Always** validate input with Zod schemas
- **Always** check authentication/authorization
- **Never** trust client input
- Use the `actionWrapper` for consistent error handling
- Log security-relevant events

### 6. Testing

```typescript
import { describe, it, expect } from 'vitest'
import { createProject } from './create-project'

describe('createProject', () => {
  it('should create a project', async () => {
    const result = await createProject({ name: 'Test Project' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Test Project')
    }
  })
})
```

## Future Additions

- Rate limiting per action (Slice 3)
- Authentication checks (Slice 3)
- Database transactions (Slice 2)
- Optimistic updates helpers (Slice 4)
