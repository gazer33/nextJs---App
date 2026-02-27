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

## Conclusion

Phase 1 provides a solid, production-ready UI foundation with:

- ✅ Modern Next.js architecture
- ✅ Comprehensive component library
- ✅ Accessible, responsive design
- ✅ Dark mode support
- ✅ Excellent developer experience (TypeScript, ESLint, Prettier)

Phase 2 will layer on backend functionality without disrupting the existing structure. The architecture is designed to scale incrementally, maintaining code quality and user experience throughout.

**Ready for Phase 2!**
