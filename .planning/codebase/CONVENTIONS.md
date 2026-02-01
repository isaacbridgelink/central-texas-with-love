# Coding Conventions

**Analysis Date:** 2026-01-31

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `ProductCard.tsx`, `Navigation.tsx`, `Hero.tsx`)
- Data/utilities: camelCase (e.g., `products.ts`)
- All source files use `.ts` or `.tsx` extensions

**Functions:**
- Component functions: PascalCase (e.g., `export default function ProductCard()`)
- Helper functions: camelCase (e.g., `getProductsByCategory()`, `getProductById()`)
- Event handlers: camelCase with `on` prefix (e.g., `onClick`, `onNavigate`, `onExplore`)

**Variables:**
- State variables: camelCase (e.g., `menuOpen`, `isHovered`, `activeCategory`, `isScrolled`)
- Constants: camelCase (e.g., `navItems`, `artworks`, `categories`)
- Props interfaces: PascalCase with `Props` suffix (e.g., `NavigationProps`, `ProductCardProps`, `HeroProps`)

**Types and Interfaces:**
- Interface declarations: PascalCase with descriptive names (e.g., `Product`, `NavigationProps`)
- Optional properties denoted with `?` (e.g., `uv?: string` in Product interface)
- Nested object types defined inline using object literal notation

## Code Style

**Formatting:**
- No explicit Prettier configuration file; inferred from codebase analysis
- 2-space indentation used throughout
- Arrow function notation preferred for callbacks and handlers
- Implicit return statements used in short JSX expressions

**Linting:**
- ESLint configured via `eslint.config.js`
- Configuration extends:
  - `@eslint/js` - Core JavaScript recommendations
  - `typescript-eslint` - TypeScript strict type checking
  - `react-hooks` - React hooks best practices
  - `react-refresh` - Fast refresh support
- Target: `ecmaVersion: 2020` with browser globals
- No unused locals or parameters allowed (enforced by TypeScript: `noUnusedLocals: true`, `noUnusedParameters: true`)

**TypeScript:**
- Strict mode enabled (`"strict": true`)
- Target: `ES2022`
- JSX: `react-jsx` (React 17+ auto-import)
- Module resolution: `bundler` mode
- No side-effect imports without verification

## Import Organization

**Order:**
1. React and framework imports (e.g., `import { useState } from 'react'`)
2. Third-party libraries (e.g., `import { motion } from 'framer-motion'`)
3. Local components and utilities (e.g., `import App from './App.tsx'`)
4. Styles and assets (e.g., `import './index.css'`)

**Examples from codebase:**
```typescript
// Navigation.tsx - correct ordering
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}
```

```typescript
// ProductCard.tsx - correct ordering
import { useState } from 'react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  // ...
}
```

**Path Aliases:**
- Not currently configured; absolute imports from `src/` used throughout

## Error Handling

**Patterns:**
- No explicit error boundaries or error handling patterns detected in current codebase
- Non-null assertion operator (`!`) used when DOM elements are guaranteed (e.g., `document.getElementById('root')!`)
- No try-catch blocks in React components; assumes event handlers don't throw

**Recommendations:**
- Add explicit error boundaries for production use
- Consider error handling for form submissions and async operations

## Logging

**Framework:** Native `console` object

**Patterns:**
- No logging framework (Pino, Winston, etc.) currently configured
- Production code doesn't include explicit logging
- Recommended for production: implement logging service or use console with debug levels

## Comments

**When to Comment:**
- Sparse use of comments in existing code
- Comments used for section demarcation in HTML/JSX (e.g., `{/* Navbar */}`, `{/* Image container */}`)
- No code-level comment documentation in utility functions or complex logic

**JSDoc/TSDoc:**
- Not currently used for function/type documentation
- Recommended: Add JSDoc comments for exported interfaces and utility functions

**Examples:**
```typescript
// Section comments (HTML structure)
{/* Hero Section */}

// Sparse code comments
// Sample products - replace with real data
```

## Function Design

**Size:**
- Small, focused functions preferred
- Component functions range from 20-200 lines depending on complexity
- Utility functions kept concise (3-10 lines)
- Example: `getProductsByCategory()` is 4 lines

**Parameters:**
- Props interfaces used for component parameters
- Destructuring applied to props in function signatures
- Example: `export default function ProductCard({ product, index, onClick }: ProductCardProps)`

**Return Values:**
- React components return JSX.Element (implicit)
- Utility functions return typed values (e.g., `Product[]`, `Product | undefined`)
- Array filter/map operations chained for readability

## Module Design

**Exports:**
- Default export for React components: `export default function ComponentName()`
- Named exports for utilities and types: `export interface Product {}`, `export const products: Product[] = []`
- Single responsibility per component file

**Barrel Files:**
- Not used; no `index.ts` files in component directories
- Direct imports from component files preferred

**Component Structure Pattern:**
```typescript
// 1. Import section
import { ... } from 'react'
import { ... } from 'third-party'

// 2. Interface/Type definitions
interface ComponentProps {
  prop1: string
  prop2: () => void
}

// 3. Constants
const navItems = [...]

// 4. Component function
export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State
  const [state, setState] = useState(false)

  // Effects
  useEffect(() => {}, [])

  // JSX
  return (...)
}
```

**Data/Utility Module Structure:**
```typescript
// 1. Interface definitions
export interface DataType {
  field: type
}

// 2. Data constants
export const dataArray: DataType[] = [...]

// 3. Utility functions
export const helperFunction = (param: type): ReturnType => {
  return ...
}
```

---

*Convention analysis: 2026-01-31*
