# Architecture

**Analysis Date:** 2026-01-31

## Pattern Overview

**Overall:** Single-Page Application (SPA) with Component-Based UI Architecture

**Key Characteristics:**
- React 19 with TypeScript for type-safe component development
- Framer Motion for declarative animations and transitions
- Tailwind CSS for utility-first styling with CSS variables for theming
- Client-side routing via hash anchors (#)
- Functional components with React hooks (useState, useEffect)
- Vite as the build tool for fast development and optimized production builds

## Layers

**Presentation Layer (UI Components):**
- Purpose: Render user interface and handle user interactions
- Location: `src/components/`
- Contains: Functional React components (Navigation, Hero, About, ProductCard, ProductGrid, ProductModal, Footer, CustomCursor)
- Depends on: Data layer (products), Framer Motion for animations, Tailwind CSS for styling
- Used by: Main App component

**Data Layer:**
- Purpose: Manage product data, filtering, and retrieval logic
- Location: `src/data/products.ts`
- Contains: Product interface definition, hardcoded product array, utility functions (getProductsByCategory, getProductById)
- Depends on: None (self-contained)
- Used by: Components that need product information

**Root Component Layer:**
- Purpose: Orchestrate overall application layout and state
- Location: `src/App.tsx`
- Contains: Main layout composition, product state management, category filtering
- Depends on: All presentation layer components, Framer Motion
- Used by: Entry point via `src/main.tsx`

**Entry Point:**
- Location: `src/main.tsx`
- Initializes React root, renders App component within StrictMode
- Loads global styles from `src/index.css`

**Styling Layer:**
- Purpose: Define global styles, theme variables, typography, and animation utilities
- Location: `src/index.css`
- Contains: CSS variables for colors (green, stone, amber), font imports (DM Sans, Fraunces), global resets
- Depends on: Google Fonts, Tailwind CSS via @import
- Used by: All components via Tailwind utility classes and CSS variables

## Data Flow

**Product Display Flow:**

1. `src/App.tsx` maintains product data array (artworks) and category state
2. User interacts with navigation or category filters
3. `activeCategory` state updates, triggering filtered product computation
4. Filtered products array passed as props to `ProductGrid` component
5. `ProductGrid` maps products to individual `ProductCard` components
6. User clicks product → `ProductModal` opens with full product details
7. Modal displays product with natural/UV image toggle and contact CTA

**Navigation/Scroll Flow:**

1. User clicks navigation link or hash anchor
2. Browser scrolls to target section (smooth scroll enabled via `html { scroll-behavior: smooth }`)
3. `Navigation` component tracks scroll position via window scroll listener
4. Header background and styling updates based on scroll position (glassmorphism effect)
5. Mobile menu toggles open/closed based on button click

**Animation Flow:**

1. Framer Motion `initial`, `animate`, `whileInView`, `whileHover` states drive all animations
2. Components use `useInView` viewport detection for scroll-triggered animations
3. Stagger effects applied via `delay` prop on child elements
4. Hover states trigger scale and color transitions
5. Modal animations use `AnimatePresence` for enter/exit sequences

**State Management:**

- Component-level state only (no global state manager)
- `useState` for menu toggles, category filters, modal open/close, hover states
- Props drilling for passing callbacks and data between components
- No Redux, Zustand, or Context API in use

## Key Abstractions

**Product Interface:**
- Purpose: Defines shape of product data across application
- Examples: `src/data/products.ts`, `src/components/ProductCard.tsx`, `src/components/ProductModal.tsx`
- Pattern: TypeScript interface with required fields (id, name, price, description, dimensions, weight, images, category)
- Allows optional UV image variant for UV-reactive feature

**Component Composition Pattern:**
- Purpose: Build complex UIs from smaller, reusable components
- Examples: `ProductGrid` composes `ProductCard` components; `App` composes all major sections
- Pattern: Parent components manage state and callbacks, pass as props to children
- Enables isolation of concerns and easier testing/modification

**Framer Motion Animations:**
- Purpose: Provide smooth, declarative animations throughout UI
- Examples: Hero entrance animations, scroll-triggered reveals, hover effects on product cards, modal transitions
- Pattern: Define animation states (initial, animate, whileHover, whileInView), let Framer Motion handle DOM updates
- Improves perceived performance and user engagement

**CSS Variable Theme System:**
- Purpose: Centralize color and styling decisions
- Examples: `--color-forest`, `--color-mint`, `--color-terracotta`, `--color-deep-green`, `--color-sage`, `--color-lime`, `--color-cream`
- Pattern: Define variables in `src/index.css`, reference via `var(--color-name)` in Tailwind @apply or inline styles
- Allows easy theme switching and consistent color usage

## Entry Points

**Application Entry:**
- Location: `src/main.tsx`
- Triggers: Script tag in `index.html` (`<script type="module" src="/src/main.tsx"></script>`)
- Responsibilities: Create React root, render App component, establish React Strict Mode for development warnings

**Main App Component:**
- Location: `src/App.tsx`
- Triggers: Mounted by `src/main.tsx`
- Responsibilities:
  - Define application layout (header, sections, footer)
  - Manage product data and filtering state
  - Orchestrate navigation and modal states
  - Compose all major UI sections (Navigation, Hero, About, ProductGrid sections, Contact, Footer)

**Individual Routes (Hash-Based):**
- Navigation implemented via anchor links (#about, #under50, #lamps, #decor, #other, #contact)
- No router library; browser's native scroll behavior handles "routing"
- Links in Navigation component and CTA buttons trigger scroll-to-section behavior

## Error Handling

**Strategy:** Graceful degradation and defensive rendering

**Patterns:**
- ProductModal checks `if (!product) return null` to prevent rendering without data
- ProductGrid provides "Coming Soon" fallback when product list is empty (`products.length > 0 ? ... : ...`)
- No try-catch blocks present; data is hardcoded and static, so runtime errors minimal
- TypeScript strict mode enforces type safety to prevent null/undefined errors at compile time

## Cross-Cutting Concerns

**Styling/Theming:**
- Centralized in `src/index.css` via CSS variables and global styles
- Tailwind CSS for utility-first responsive design
- Custom fonts (DM Sans for body, Fraunces for headings) loaded from Google Fonts
- Responsive breakpoints: sm (640px), md (768px), lg (1024px) via Tailwind

**Animation:**
- Framer Motion library handles all transitions
- Entrance animations on hero and sections (opacity, translate, scale)
- Scroll-triggered animations with `whileInView` and `viewport={{ once: true }}`
- Hover state animations for interactive elements
- Modal enter/exit animations via `AnimatePresence`

**Accessibility:**
- Semantic HTML (section, nav, article elements)
- Proper heading hierarchy (h1, h2, h3)
- Alt text on all images
- Focus states handled by browser defaults (can be enhanced)
- ARIA attributes minimal; semantic HTML provides baseline accessibility

**Responsiveness:**
- Mobile-first design approach
- Tailwind breakpoints: hidden/flex on mobile vs desktop navigation
- Grid layouts adapt: grid-cols-1 → grid-cols-2 → grid-cols-3
- Flexible padding/spacing with responsive utility classes
- Modals use viewport-relative insets (inset-4 md:inset-8 lg:inset-16)

**Performance Considerations:**
- Client-side filtering (no server calls)
- Image optimization via browser native loading
- CSS-in-JS via Tailwind (no runtime overhead)
- Vite dev server with HMR for fast iteration
- Production build uses tree-shaking to remove unused code

---

*Architecture analysis: 2026-01-31*
