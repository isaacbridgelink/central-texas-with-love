# Testing Patterns

**Analysis Date:** 2026-01-31

## Test Framework

**Runner:**
- Not installed - No testing framework currently configured
- Recommended: `vitest` or `jest` for React component testing

**Assertion Library:**
- Not installed - No assertion library currently configured
- Recommended: `@testing-library/react` + `vitest` or `jest`

**Build Integration:**
- TypeScript build enforces type safety via `tsc -b && vite build`
- ESLint runs via `npm run lint` for code quality checks
- No test runner script configured in `package.json`

**Run Commands:**
```bash
npm run dev              # Development server (Vite)
npm run build            # TypeScript compilation + Vite build
npm run lint             # ESLint checks
npm run preview          # Preview production build
```

**No test commands available.** To add testing:
```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom
npm install --save-dev jsdom  # For DOM testing
```

## Test File Organization

**Current Status:**
- No test files exist in `src/` directory
- No test directory (`tests/`, `__tests__/`, or similar)
- Codebase is newly initialized without test coverage

**Recommended Location:**
- Co-locate with source files: `src/components/ProductCard.test.tsx` alongside `src/components/ProductCard.tsx`
- Or use separate directory: `src/__tests__/components/ProductCard.test.tsx`
- Recommended pattern: co-location for easier maintenance

**Naming Convention:**
- Use `.test.tsx` suffix for component tests
- Use `.test.ts` suffix for utility function tests
- Examples: `ProductCard.test.tsx`, `products.test.ts`

**Directory Structure (Proposed):**
```
src/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductCard.test.tsx
│   ├── Navigation.tsx
│   ├── Navigation.test.tsx
│   └── ...
├── data/
│   ├── products.ts
│   ├── products.test.ts
└── App.tsx
```

## Test Structure

**Suite Organization (Recommended with Vitest):**
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  describe('rendering', () => {
    it('renders product name', () => {
      const product = {
        id: '1',
        name: 'Test Product',
        price: 100,
        // ... other required fields
      }
      render(<ProductCard product={product} index={0} onClick={() => {}} />)
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onClick when card is clicked', () => {
      // Test implementation
    })
  })
})
```

**Patterns (To Be Implemented):**
- Use `describe()` for test suites grouped by feature or component
- Use `it()` for individual test cases with clear descriptions
- Setup: `beforeEach()` for common test data or DOM setup
- Teardown: `afterEach()` for cleanup (rarely needed with testing-library)
- Assertion: Use `expect()` from vitest assertion library

## Mocking

**Framework:** Vitest (recommended)

**Patterns (To Be Implemented):**
```typescript
// Mock third-party libraries
import { vi } from 'vitest'

// Mock framer-motion for component tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
    button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    // Mock other motion components as needed
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock event handlers
const mockOnNavigate = vi.fn()
render(<Navigation currentSection="home" onNavigate={mockOnNavigate} />)
expect(mockOnNavigate).toHaveBeenCalledWith('about')
```

**What to Mock:**
- Animation libraries (`framer-motion`) - reduce test complexity
- External API calls - prevent network requests in tests
- Event handlers passed as props - verify they're called correctly
- User interactions that are hard to simulate

**What NOT to Mock:**
- Core React hooks (`useState`, `useEffect`) - test actual behavior
- DOM elements and components you're testing - test real rendering
- Utility functions defined in your codebase - test actual logic
- Styling libraries (Tailwind) - not needed for component tests

## Fixtures and Factories

**Test Data (Proposed):**
```typescript
// src/components/__fixtures__/products.ts
export const mockProduct = {
  id: '1',
  name: 'Coral Dream Lamp',
  price: 85,
  description: 'Test description',
  dimensions: '12" H x 6" W x 6" D',
  weight: '3.2 lbs',
  images: {
    natural: '/test-image.jpg',
    uv: '/test-image-uv.jpg',
  },
  category: 'Lamps & Lighting',
}

export const createMockProduct = (overrides = {}) => ({
  ...mockProduct,
  ...overrides,
})

// Usage in tests
it('renders product card', () => {
  const product = createMockProduct({ name: 'Custom Name' })
  render(<ProductCard product={product} index={0} onClick={() => {}} />)
})
```

**Location (Recommended):**
- `src/__fixtures__/` for shared test data
- Or `src/components/__fixtures__/` for component-specific data
- Keep fixtures close to components that use them

## Coverage

**Requirements:** Not enforced

**View Coverage (Once Tests Added):**
```bash
vitest run --coverage
```

**Recommended Coverage Targets:**
- Statements: 80%+
- Branches: 70%+
- Functions: 80%+
- Lines: 80%+

## Test Types

**Unit Tests:**
- Scope: Individual components and utility functions
- Approach: Test props, state changes, event handlers
- Examples:
  - `ProductCard` renders with correct product data
  - `getProductsByCategory()` filters products correctly
  - `Navigation` opens/closes mobile menu on button click

**Integration Tests:**
- Scope: Multiple components working together
- Approach: Test data flow between components
- Examples:
  - `App` renders all sections correctly
  - Navigation links scroll to correct sections
  - Product filtering updates display correctly

**E2E Tests:**
- Framework: Not configured; recommend `Playwright` or `Cypress`
- Not currently implemented
- Scope: User workflows end-to-end
- Examples: Purchase flow, form submission, search functionality

## Common Patterns

**Async Testing (Recommended):**
```typescript
import { waitFor } from '@testing-library/react'

it('loads and displays data', async () => {
  render(<DataComponent />)

  // Wait for element to appear (max 1000ms)
  await waitFor(() => {
    expect(screen.getByText('Data Loaded')).toBeInTheDocument()
  })
})

// For animations (framer-motion), disable animations in tests:
// vi.mock('framer-motion', () => ({ motion: { ... } }))
```

**Error Testing (Recommended):**
```typescript
it('handles missing required props gracefully', () => {
  // Test component behavior when props are incomplete
  const { container } = render(<ComponentWithDefaults />)
  expect(container).toBeInTheDocument()
})

it('shows error state', () => {
  render(<Component error="Something went wrong" />)
  expect(screen.getByText('Something went wrong')).toBeInTheDocument()
})
```

**Event Handler Testing (Recommended):**
```typescript
import { fireEvent, userEvent } from '@testing-library/react'

it('calls onClick handler', async () => {
  const mockClick = vi.fn()
  render(<button onClick={mockClick}>Click me</button>)

  // Option 1: fireEvent (simulates event)
  fireEvent.click(screen.getByText('Click me'))
  expect(mockClick).toHaveBeenCalled()

  // Option 2: userEvent (more realistic user interaction - preferred)
  await userEvent.click(screen.getByText('Click me'))
  expect(mockClick).toHaveBeenCalled()
})
```

## Current State

**Testing Status:**
- No test files present in codebase
- No test framework installed or configured
- ESLint provides code quality checking as substitute

**Next Steps to Add Testing:**
1. Install vitest and testing-library:
   ```bash
   npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
   ```

2. Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/test/setup.ts'],
     },
   })
   ```

3. Add test script to `package.json`:
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest run --coverage"
   ```

4. Create test setup file (`src/test/setup.ts`)

5. Start writing tests co-located with components

---

*Testing analysis: 2026-01-31*
