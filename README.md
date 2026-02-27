# ProjectHub - Phase 1 (UI Foundation)

A modern project management application built with Next.js 15, React 19, and TypeScript. This is Phase 1 focusing on the UI foundation and design system.

## Features (Phase 1)

- **Next.js App Router** - Using the latest Next.js 15 with App Router architecture
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui Components** - High-quality, accessible UI components
- **Dark Mode** - Light, dark, and system preference theme support
- **Responsive Design** - Mobile-first responsive navigation and layouts
- **Error Handling** - Global error boundaries and 404 page
- **Loading States** - Skeleton loaders and empty state components
- **Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation

## Tech Stack

- **Framework:** Next.js 15.1.5 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Code Quality:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
# or
npm install
```

2. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Landing page
│   ├── error.tsx          # Global error boundary
│   ├── not-found.tsx      # 404 page
│   ├── app/               # App shell routes
│   │   ├── layout.tsx     # App layout with sidebar
│   │   ├── page.tsx       # Dashboard
│   │   └── [section]/     # Dynamic section pages
│   └── settings/          # Settings page
│       └── page.tsx
├── components/
│   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   └── toast.tsx
│   ├── layout/            # Layout components
│   │   ├── top-nav.tsx    # Top navigation bar
│   │   ├── side-nav.tsx   # Sidebar navigation
│   │   └── app-shell.tsx  # App shell wrapper
│   ├── theme-provider.tsx # Theme context provider
│   ├── theme-toggle.tsx   # Theme switcher button
│   ├── empty-state.tsx    # Empty state component
│   └── error-boundary.tsx # Error boundary component
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── styles/
    └── globals.css        # Global styles and CSS variables
```

## Routes

- `/` - Landing page
- `/app` - Dashboard (main app view)
- `/app/projects` - Projects section (placeholder)
- `/app/tasks` - Tasks section (placeholder)
- `/settings` - Settings page

## UI Components

All components follow the shadcn/ui pattern with:

- Variants using `class-variance-authority`
- Composable and accessible design
- Full TypeScript support
- Tailwind CSS styling

### Component Library

- **Button** - Multiple variants (default, outline, ghost, destructive, etc.)
- **Card** - Composable card with header, content, footer
- **Input** - Styled form input with focus states
- **Badge** - Status badges with variants
- **Skeleton** - Loading state placeholders
- **Dialog** - Modal dialogs (Radix UI)
- **Drawer** - Mobile-friendly bottom sheet (Vaul)
- **Toast** - Toast notifications (Sonner)

## Theming

The app uses CSS variables for theming, supporting:

- **Light mode** - Clean, bright interface
- **Dark mode** - Easy on the eyes
- **System preference** - Automatically matches OS theme

Theme can be toggled using the button in the top navigation bar.

### CSS Variables

Defined in `src/styles/globals.css`:

- `--background`, `--foreground`
- `--primary`, `--secondary`, `--accent`
- `--muted`, `--destructive`
- `--border`, `--input`, `--ring`
- `--radius` (border radius)

## Code Quality

### ESLint

Configured with:

- Next.js recommended rules
- TypeScript strict mode
- Prettier integration

### Prettier

Configured for consistent code formatting:

- Single quotes
- No semicolons
- 2-space indentation
- Trailing commas (ES5)

## Accessibility

- Semantic HTML elements (`header`, `nav`, `main`, `aside`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox

## What's Next? (Phase 2)

Phase 2 will add:

1. **Domain Layer** - Business logic and data models
2. **Server Actions** - Next.js server actions for mutations
3. **Database** - Prisma ORM with SQLite
4. **Authentication** - User authentication and authorization
5. **CRUD Operations** - Full create, read, update, delete for projects and tasks
6. **Validation** - Zod schema validation
7. **Testing** - Unit and integration tests
8. **CI/CD** - GitHub Actions pipeline

See `cloude.md` for architectural decisions and detailed Phase 2 plan.

## License

MIT
