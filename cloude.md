# cloude.md - Project Documentation

**Last Updated:** Phase 1 Complete
**Project:** ProjectHub - Project Management Tool
**Current Phase:** Phase 1 (UI Foundation)

---

## Product Vision

ProjectHub is a modern project management application designed to help teams and individuals organize projects and tasks efficiently. The core domain centers around a **Projects → Tasks** relationship, where each project can contain multiple tasks with status tracking, priorities, and assignments.

### Domain Model (for Phase 2)

```
Project
├── id
├── name
├── description
├── status (planning, active, completed, archived)
├── createdAt
├── updatedAt
└── tasks[] (relationship)

Task
├── id
├── title
├── description
├── status (todo, in_progress, done)
├── priority (low, medium, high)
├── projectId (foreign key)
├── createdAt
└── updatedAt
```

---

## Phase 1 - UI Foundation (COMPLETE)

### Objectives

Build a production-ready UI foundation with:

1. Clean, maintainable component architecture
2. Responsive navigation and layouts
3. Comprehensive design system
4. Accessibility and UX best practices
5. Dark mode support

### Architecture Decisions

#### 1. **Framework & Routing**

- **Next.js 15** with App Router for:
  - File-based routing
  - React Server Components by default
  - Built-in optimizations (Image, Font, etc.)
  - Streaming and Suspense support
- **TypeScript** strict mode for type safety

#### 2. **Styling Strategy**

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (light/dark mode)
- **shadcn/ui pattern** for component design:
  - Copy-paste components (not npm package)
  - Built on Radix UI primitives (accessibility)
  - Variants using `class-variance-authority`
  - Composable and customizable

**Rationale:** This approach gives us full control over components while maintaining consistency and accessibility.

#### 3. **Component Architecture**

```
components/
├── ui/              # Primitive UI components (buttons, inputs, etc.)
├── layout/          # Layout-specific components (nav, shell)
└── [shared]/        # Cross-cutting components (theme, error boundaries)
```

**Naming Conventions:**

- Components: PascalCase (e.g., `TopNav`, `EmptyState`)
- Files: kebab-case (e.g., `top-nav.tsx`, `empty-state.tsx`)
- Utilities: camelCase (e.g., `cn`, `formatDate`)

**Component Guidelines:**

- Use `'use client'` directive only when needed (interactivity, hooks, context)
- Prefer Server Components for static content
- Export named functions, not default exports (except page.tsx)
- Use `React.forwardRef` for components that need refs

#### 4. **Design System**

**Color Palette:**

- Primary: Blue (`hsl(221.2, 83.2%, 53.3%)`)
- Secondary: Slate gray
- Destructive: Red
- Muted: Light gray (backgrounds, disabled states)
- Accent: Used for hover states

**Spacing Scale:** Tailwind default (4px base unit)

**Typography:**

- Font: Inter (Google Fonts)
- Scale: text-sm, text-base, text-lg, text-xl, etc.
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Border Radius:**

- Default: `0.5rem` (8px)
- Configurable via `--radius` CSS variable

**Component Variants:**

- Button: default, outline, ghost, secondary, destructive, link
- Badge: default, outline, secondary, destructive
- Card: default (no variants, customizable via className)

#### 5. **Navigation Pattern**

**Two-tier navigation:**

1. **Top Nav (TopNav):**
   - Always visible (sticky)
   - Contains: Logo, main links (Home, Dashboard, Settings), theme toggle
   - Mobile: Hamburger menu with overlay
   - Active state: Highlighted based on pathname

2. **Side Nav (SideNav):**
   - Only visible in `/app/*` routes
   - Desktop: Fixed sidebar (64px wide)
   - Mobile: Hidden (use top nav)
   - Contains: Dashboard, Projects, Tasks, Settings
   - Active state: Highlighted with background color

**Layout Hierarchy:**

```
RootLayout (app/layout.tsx)
└── TopNav (always present)
    └── Page content
        └── AppLayout (app/app/layout.tsx)
            └── AppShell (SideNav + main content area)
```

#### 6. **State Management**

**Phase 1 (current):**

- Theme: React Context (`ThemeProvider`) with localStorage persistence
- No global state management (yet)

**Phase 2 (planned):**

- Server state: React Query or SWR
- Form state: React Hook Form + Zod
- Global client state: Zustand (if needed)

#### 7. **Error Handling**

**Three levels:**

1. **Global Error Boundary** (`app/error.tsx`):
   - Catches runtime errors in page components
   - Shows user-friendly error UI
   - Provides "Try again" button (calls reset)

2. **404 Not Found** (`app/not-found.tsx`):
   - Custom 404 page
   - Link back to home

3. **Component Error Boundary** (`components/error-boundary.tsx`):
   - Class component for wrapping risky components
   - Can be used selectively in Phase 2

#### 8. **Loading States**

**Strategies:**

1. **Skeleton Loading** (`components/ui/skeleton.tsx`):
   - Used for data-driven content
   - Example: Dashboard card skeletons

2. **Empty States** (`components/empty-state.tsx`):
   - Used when no data exists
   - Includes icon, title, description, optional action
   - Example: "No projects yet" in `/app/projects`

3. **Suspense Boundaries** (Phase 2):
   - Will use React Suspense for async server components
   - Fallback to skeletons

#### 9. **Accessibility (a11y)**

**Implementation:**

- Semantic HTML (`<nav>`, `<header>`, `<main>`, `<aside>`)
- ARIA labels on icon buttons (`aria-label="Toggle theme"`)
- Screen reader text (`<span className="sr-only">`)
- Focus visible states (Tailwind `focus-visible:ring-2`)
- Keyboard navigation (Radix UI handles this)
- Color contrast: WCAG AA compliant

**Tools for Phase 2:**

- `eslint-plugin-jsx-a11y` (already configured)
- Lighthouse audits
- Axe DevTools

#### 10. **Code Quality**

**ESLint:**

- `next/core-web-vitals` preset
- TypeScript rules
- Prettier integration
- Unused var warnings (with `_` prefix ignore pattern)

**Prettier:**

- Single quotes
- No semicolons
- 2-space tabs
- Trailing commas (ES5)
- 80 character line width

**TypeScript:**

- Strict mode enabled
- `noEmit: true` (Next.js handles builds)
- Path alias: `@/*` → `src/*`

---

## Routes Map

| Route                | File                          | Layout       | Description                        |
| -------------------- | ----------------------------- | ------------ | ---------------------------------- |
| `/`                  | `app/page.tsx`                | RootLayout   | Landing page                       |
| `/app`               | `app/app/page.tsx`            | AppLayout    | Dashboard                          |
| `/app/projects`      | `app/app/[section]/page.tsx`  | AppLayout    | Projects section (dynamic)         |
| `/app/tasks`         | `app/app/[section]/page.tsx`  | AppLayout    | Tasks section (dynamic)            |
| `/settings`          | `app/settings/page.tsx`       | RootLayout   | Settings page                      |
| `*` (not found)      | `app/not-found.tsx`           | RootLayout   | 404 page                           |

**Dynamic Route:**

- `app/app/[section]/page.tsx` handles `/app/*` paths
- Displays empty state placeholder for Phase 2 implementation

---

## Files & Responsibilities

### Configuration Files

| File                    | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `package.json`          | Dependencies and scripts                     |
| `tsconfig.json`         | TypeScript configuration                     |
| `next.config.ts`        | Next.js configuration                        |
| `tailwind.config.ts`    | Tailwind CSS configuration (colors, radius)  |
| `postcss.config.mjs`    | PostCSS plugins (Tailwind, Autoprefixer)     |
| `.eslintrc.json`        | ESLint rules                                 |
| `.prettierrc`           | Prettier formatting rules                    |
| `components.json`       | shadcn/ui configuration                      |

### Source Files

| File/Directory                 | Responsibility                                   |
| ------------------------------ | ------------------------------------------------ |
| `src/app/layout.tsx`           | Root layout: ThemeProvider, TopNav, Toaster      |
| `src/app/page.tsx`             | Landing page with hero and features             |
| `src/app/app/layout.tsx`       | App layout: wraps children in AppShell           |
| `src/app/app/page.tsx`         | Dashboard with stats cards                       |
| `src/components/ui/*`          | Reusable UI primitives                           |
| `src/components/layout/*`      | Navigation and shell components                  |
| `src/components/theme-*`       | Theme management (provider, toggle)              |
| `src/lib/utils.ts`             | Utility functions (`cn` for className merging)   |
| `src/styles/globals.css`       | Global styles, CSS variables, Tailwind directives|

---

## How Phase 2 Will Plug In

Phase 2 will build on this foundation **without rewriting** any Phase 1 code. Here's how:

### 1. **Domain Layer**

Add new directories:

```
src/
├── lib/
│   ├── db/           # Prisma client and queries
│   ├── validations/  # Zod schemas
│   └── actions/      # Server actions
```

### 2. **Database Integration**

- Add Prisma schema (`prisma/schema.prisma`)
- SQLite database (`prisma/dev.db`)
- Migrations for Projects and Tasks tables
- Prisma Client for type-safe queries

### 3. **Server Actions**

Add server actions for CRUD operations:

```typescript
// src/lib/actions/projects.ts
'use server'

export async function createProject(data: CreateProjectInput) {
  // Validate with Zod
  // Insert to database
  // Revalidate path
  // Return result
}
```

### 4. **Form Handling**

- React Hook Form for client-side forms
- Zod schemas for validation
- Server actions for submission
- Optimistic updates for better UX

### 5. **Data Fetching**

Replace placeholder data in:

- `app/app/page.tsx` (Dashboard stats)
- `app/app/[section]/page.tsx` (Project/Task lists)

With:

- Server component data fetching
- Suspense boundaries with Skeleton fallbacks

### 6. **Authentication**

- Add NextAuth.js or Clerk
- Protect `/app/*` routes with middleware
- Add user context to layouts
- User profile in settings

### 7. **Testing**

```
__tests__/
├── components/       # Component tests (React Testing Library)
├── integration/      # Integration tests (Playwright)
└── utils/            # Test utilities
```

### 8. **Environment Variables**

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

Validate with Zod on startup.

---

## Known Limitations (Phase 1)

1. **No Data Persistence** - All data is placeholder/mock
2. **No Authentication** - Routes are not protected
3. **No Forms** - Forms in settings are disabled
4. **Limited Interactivity** - Only theme toggle and navigation work
5. **No Tests** - Testing infrastructure deferred to Phase 2

These are intentional and will be addressed in Phase 2.

---

## Phase 2 Implementation Checklist

When starting Phase 2, implement in this order:

### 2.1 - Foundation

- [ ] Set up Prisma with SQLite
- [ ] Define schema (Projects, Tasks tables)
- [ ] Run initial migration
- [ ] Create seed data script
- [ ] Add environment variable validation (Zod)

### 2.2 - Domain Layer

- [ ] Create Zod validation schemas
- [ ] Create TypeScript types from schemas
- [ ] Write server actions for Projects CRUD
- [ ] Write server actions for Tasks CRUD
- [ ] Add error handling utilities

### 2.3 - UI Integration

- [ ] Add project list page with real data
- [ ] Add project detail page
- [ ] Add project creation form
- [ ] Add task list with filtering
- [ ] Add task creation/edit forms
- [ ] Update dashboard with real stats

### 2.4 - Authentication

- [ ] Set up NextAuth.js (or Clerk)
- [ ] Add sign-in/sign-up pages
- [ ] Protect `/app` routes with middleware
- [ ] Add user association to Projects/Tasks
- [ ] Update settings page with real profile

### 2.5 - Polish

- [ ] Add optimistic updates
- [ ] Add toast notifications for actions
- [ ] Add loading states (Suspense)
- [ ] Add search and filtering
- [ ] Add sorting and pagination

### 2.6 - Testing & CI

- [ ] Write component tests
- [ ] Write integration tests
- [ ] Set up GitHub Actions
- [ ] Add pre-commit hooks (Husky)
- [ ] Configure test coverage thresholds

---

## Phase 2 - Scalability (IN PROGRESS)

### Slice 1: Architecture Foundation + Tooling (COMPLETE)

**Implemented:**

1. **Repository Hygiene**
   - Stricter TypeScript config (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
   - Enhanced ESLint rules (consistent type imports, no-console warnings)
   - Enforced casing consistency

2. **Directory Structure**
   ```
   src/
   ├── lib/              # Cross-cutting utilities (client-safe)
   │   ├── env.ts        # Environment validation (server-only)
   │   ├── logger.ts     # Logging utilities
   │   ├── errors.ts     # Standardized error types
   │   └── utils.ts      # Existing utilities
   ├── server/           # Server-only code
   │   ├── actions/      # Next.js Server Actions
   │   │   └── README.md # Action conventions
   │   └── utils/
   │       └── action-wrapper.ts  # Error handling wrapper
   ├── components/       # React components
   ├── app/             # Next.js App Router
   └── styles/          # Global styles
   ```

3. **Server/Client Boundaries**
   - `/src/server` is strictly server-only (enforced with `'server-only'` package)
   - `/src/lib/env.ts` can only be imported in server contexts
   - Client components must use server actions for mutations
   - Server Components can directly access server utilities

4. **Environment Validation**
   - Zod schema validates all environment variables at startup
   - Type-safe `env` export for server-side use
   - `.env.example` documents required variables
   - Singleton pattern prevents re-validation overhead

   **Required env vars:**
   - `DATABASE_URL` - Prisma connection string
   - `SESSION_SECRET` - Session encryption key (min 32 chars)
   - `SESSION_MAX_AGE` - Session duration in seconds
   - `NODE_ENV` - Environment (development/production/test)
   - `NEXT_PUBLIC_APP_URL` - App base URL
   - `BCRYPT_ROUNDS` - Password hashing rounds (10-15)
   - `RATE_LIMIT_MAX` - Max requests per window
   - `RATE_LIMIT_WINDOW_MS` - Rate limit window in ms

5. **Error Handling**

   **Error Classes:**
   ```typescript
   - AppError            // Base error (500)
   - ValidationError     // Invalid input (400)
   - AuthenticationError // Not authenticated (401)
   - AuthorizationError  // No permission (403)
   - NotFoundError       // Resource not found (404)
   - RateLimitError      // Too many requests (429)
   ```

   **Action Result Pattern:**
   ```typescript
   type ActionResult<T> =
     | { success: true; data: T }
     | { success: false; error: { message: string; code?: string; field?: string } }
   ```

   **Usage:**
   ```typescript
   const result = await createProject({ name: 'My Project' })

   if (!result.success) {
     // Handle error: result.error.message
     return
   }

   // Use data: result.data.id
   ```

6. **Logging Strategy**
   - Structured logging with timestamp, level, context
   - Debug logs only in development
   - Error logs include stack traces
   - Production-ready format for log aggregation
   - No PII in logs (will be enforced in auth slice)

7. **Server Action Conventions** (see `/src/server/actions/README.md`)
   - One file per action
   - Domain-based folders (auth, projects, tasks)
   - Always use `actionWrapper` for error handling
   - Always validate with Zod schemas
   - Log security events

### Architecture Decisions

#### Why `server-only` Package?

The `server-only` package ensures code in `/src/server` never gets bundled for the client. If client code tries to import it, builds fail immediately.

```bash
npm install server-only
```

Usage:
```typescript
// src/server/db.ts
import 'server-only'
// ... database code
```

#### Why Singleton Env Pattern?

Environment validation happens once at module load. Subsequent imports get cached results. This prevents:
- Re-validation overhead on every request
- Inconsistent env state during runtime

#### Why Action Wrapper?

The `actionWrapper` utility provides:
- **Consistent error handling** - All errors convert to `ActionResult`
- **Logging** - Every action logs success/failure
- **Type safety** - Input/output types are enforced
- **DRY** - No try/catch boilerplate in every action

#### Error Handling Philosophy

1. **Explicit over implicit** - Use typed error classes
2. **Client-safe errors** - Never leak stack traces to client
3. **Structured responses** - Always return `ActionResult`
4. **Logging first** - Log before returning error
5. **Fail fast** - Validate early, crash loudly in dev

### How to Extend (Future Slices)

#### Slice 2: Adding Database Access

```typescript
// src/server/db.ts
import 'server-only'
import { PrismaClient } from '@prisma/client'
import { env } from '@/lib/env'

const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
})

export { prisma }
```

#### Slice 3: Adding Authentication

```typescript
// src/server/actions/auth/login.ts
'use server'

import { actionWrapper } from '@/server/utils/action-wrapper'
import { AuthenticationError } from '@/lib/errors'
import { prisma } from '@/server/db'

export const login = actionWrapper(async (input) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } })

  if (!user) {
    throw new AuthenticationError('Invalid credentials')
  }

  // ... verify password, create session

  return { userId: user.id }
})
```

#### Slice 4: Adding CRUD Actions

```typescript
// src/server/actions/projects/create-project.ts
'use server'

import { actionWrapper } from '@/server/utils/action-wrapper'
import { z } from 'zod'
import { prisma } from '@/server/db'
import { requireAuth } from '@/server/utils/auth'

const schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
})

export const createProject = actionWrapper(async (input) => {
  const userId = await requireAuth() // Throws if not authenticated
  const validated = schema.parse(input)

  const project = await prisma.project.create({
    data: {
      ...validated,
      userId,
    },
  })

  return project
})
```

---

## Conclusion

Phase 1 provides a solid, production-ready UI foundation with:

- ✅ Modern Next.js architecture
- ✅ Comprehensive component library
- ✅ Accessible, responsive design
- ✅ Dark mode support
- ✅ Excellent developer experience (TypeScript, ESLint, Prettier)

Phase 2 Slice 1 adds the architectural foundation for scalability:

- ✅ Environment validation with Zod
- ✅ Server/client boundary enforcement
- ✅ Standardized error handling
- ✅ Logging infrastructure
- ✅ Server action conventions
- ✅ Ready for database, auth, and CRUD

---

### Slice 2: Prisma + SQLite + Migrations + Seed (COMPLETE)

**Implemented:**

1. **Prisma Setup**
   - Installed `prisma@^5.9.0` (dev) and `@prisma/client@^5.9.0` (prod)
   - Installed `tsx@^4.7.0` for running TypeScript seed files
   - Configured SQLite provider in `prisma/schema.prisma`
   - Added `postinstall` hook to auto-generate Prisma Client

2. **Database Schema**

   **Models:**
   - `User` - Authentication (id, email, passwordHash, name, timestamps)
   - `Session` - Session storage (id, userId, token, expiresAt)
   - `Project` - Projects (id, name, description, status, userId, timestamps)
   - `Task` - Tasks (id, projectId, title, description, status, priority, dueDate, timestamps)

   **Enums:**
   - `ProjectStatus` - PLANNING, ACTIVE, COMPLETED, ARCHIVED
   - `TaskStatus` - TODO, IN_PROGRESS, DONE
   - `TaskPriority` - LOW, MEDIUM, HIGH

   **Relations:**
   - User → Projects (one-to-many)
   - User → Sessions (one-to-many)
   - Project → Tasks (one-to-many)
   - Cascade deletes on user/project deletion

   **Indexes:**
   - `userId` on projects, sessions
   - `token` on sessions
   - `projectId` on tasks
   - `status` on projects and tasks
   - `priority` on tasks

3. **Database Client (`src/server/db.ts`)**
   - Singleton pattern to prevent connection exhaustion
   - Global instance in development (hot reload safe)
   - Fresh instance in production
   - Logging: query/error/warn in dev, error-only in prod
   - Auto-connect on first query with logging
   - `disconnectDatabase()` helper for cleanup

4. **Seed Script (`prisma/seed.ts`)**
   - Creates 1 demo user (email: demo@example.com)
   - Creates 3 sample projects (ACTIVE, PLANNING, COMPLETED)
   - Creates 10 tasks across projects with variety:
     - Different statuses (TODO, IN_PROGRESS, DONE)
     - Different priorities (LOW, MEDIUM, HIGH)
     - Some with due dates
   - Clears existing data before seeding (safe for dev)
   - Summary output with counts

5. **Package Scripts**
   ```json
   "db:migrate"   - Run migrations (development)
   "db:generate"  - Generate Prisma Client
   "db:seed"      - Seed database with demo data
   "db:studio"    - Open Prisma Studio (GUI)
   "db:reset"     - Reset database (drops + migrates + seeds)
   "db:push"      - Push schema without migration (prototyping)
   "postinstall"  - Auto-generate client after npm install
   ```

6. **Git Ignore**
   - Added `/prisma/*.db` (SQLite database files)
   - Added `/prisma/*.db-journal` (SQLite journal files)

### Database Conventions

#### Query Patterns

**Always use transactions for multi-step operations:**
```typescript
await prisma.$transaction(async (tx) => {
  const project = await tx.project.create({ data: {...} })
  await tx.task.createMany({ data: [...] })
  return project
})
```

**Use `select` to optimize queries:**
```typescript
// Good - only fetch needed fields
await prisma.project.findMany({
  select: { id: true, name: true },
})

// Avoid - fetches all fields
await prisma.project.findMany()
```

**Use `include` for relations:**
```typescript
await prisma.project.findUnique({
  where: { id },
  include: { tasks: true },
})
```

#### Error Handling

Prisma errors should be caught and converted to `AppError`:

```typescript
import { NotFoundError } from '@/lib/errors'
import { Prisma } from '@prisma/client'

try {
  const project = await prisma.project.findUniqueOrThrow({ where: { id } })
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      throw new NotFoundError('Project')
    }
  }
  throw error
}
```

**Common Prisma error codes:**
- `P2002` - Unique constraint violation
- `P2025` - Record not found
- `P2003` - Foreign key constraint violation

#### Migrations Workflow

**Development:**
```bash
# Create migration from schema changes
npm run db:migrate

# Push schema without migration (prototyping)
npm run db:push

# Reset database (drop + migrate + seed)
npm run db:reset
```

**Production:**
```bash
# Apply pending migrations
npx prisma migrate deploy

# DO NOT use db:push in production
```

#### Seeding Strategy

- Seed script is idempotent (clears data first)
- Only runs in development (not production)
- Can be run manually: `npm run db:seed`
- Auto-runs after `npm run db:reset`
- Creates realistic demo data for testing UI

### How to Extend (Future Slices)

#### Slice 3: Adding Authentication Queries

```typescript
// src/server/repositories/user.ts
import 'server-only'
import { prisma } from '@/server/db'
import bcrypt from 'bcryptjs'

export async function createUser(email: string, password: string, name?: string) {
  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS)

  return prisma.user.create({
    data: { email, passwordHash, name },
  })
}

export async function verifyPassword(user: { passwordHash: string }, password: string) {
  return bcrypt.compare(password, user.passwordHash)
}
```

#### Slice 4: Adding Project CRUD

```typescript
// src/server/actions/projects/get-projects.ts
'use server'

import { actionWrapper } from '@/server/utils/action-wrapper'
import { prisma } from '@/server/db'
import { requireAuth } from '@/server/utils/auth'

export const getProjects = actionWrapper(async () => {
  const userId = await requireAuth()

  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      tasks: {
        select: { id: true, status: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return projects.map(project => ({
    ...project,
    taskCount: project.tasks.length,
    completedCount: project.tasks.filter(t => t.status === 'DONE').length,
  }))
})
```

---

## Conclusion

Phase 1 provides a solid, production-ready UI foundation with:

- ✅ Modern Next.js architecture
- ✅ Comprehensive component library
- ✅ Accessible, responsive design
- ✅ Dark mode support
- ✅ Excellent developer experience (TypeScript, ESLint, Prettier)

Phase 2 Slice 1 adds the architectural foundation:

- ✅ Environment validation with Zod
- ✅ Server/client boundary enforcement
- ✅ Standardized error handling
- ✅ Logging infrastructure
- ✅ Server action conventions

Phase 2 Slice 2 adds the database layer:

- ✅ Prisma ORM with SQLite
- ✅ Type-safe database schema (User, Project, Task, Session)
- ✅ Migration system
- ✅ Seed script with demo data
- ✅ Database client singleton
- ✅ Ready for authentication and CRUD

**Ready for Phase 2 Slice 3!**
