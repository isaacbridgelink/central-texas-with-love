# Technology Stack

**Analysis Date:** 2026-01-31

## Languages

**Primary:**
- TypeScript 5.9.3 - Application source code (`src/**/*.ts`, `src/**/*.tsx`)
- JSX/TSX - React component syntax and templates

**Secondary:**
- CSS - Styling via Tailwind CSS (`src/index.css`)
- HTML5 - Page structure (`index.html`)

## Runtime

**Environment:**
- Node.js (version not pinned)
- Browser-based (ES2022+ target for app, ES2023+ for build tools)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 19.2.0 - UI framework for component-based development
  - Entry point: `src/main.tsx`
  - DOM rendering via `react-dom` 19.2.0

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/vite 4.1.18 - Vite integration for Tailwind

**Animation:**
- Framer Motion 12.29.2 - Animation and motion library
  - Used in: `src/App.tsx`, `src/components/Hero.tsx`, `src/components/ProductGrid.tsx`, `src/components/ProductCard.tsx`, `src/components/ProductModal.tsx`, `src/components/Navigation.tsx`, `src/components/CustomCursor.tsx`
  - Supports motion components, spring animations, gesture handling

**Build/Dev:**
- Vite 7.2.4 - Frontend build tool and dev server
  - Config: `vite.config.ts`
  - Plugin: React fast refresh via `@vitejs/plugin-react` 5.1.1
- Vite client types: Includes `vite/client` in TypeScript

**Testing:**
- Not configured (no test runner detected)

**Linting:**
- ESLint 9.39.1 - JavaScript/TypeScript code quality
  - Config: `eslint.config.js` (flat config format)
  - Plugins:
    - @eslint/js 9.39.1
    - typescript-eslint 8.46.4
    - eslint-plugin-react-hooks 7.0.1
    - eslint-plugin-react-refresh 0.4.24
  - Extends: Recommended configs for JS, TypeScript, React hooks, React refresh

**Formatting:**
- Not explicitly configured (no .prettierrc found, but Tailwind auto-formats CSS)

## Key Dependencies

**Critical:**
- react 19.2.0 - Core UI library (latest major version)
- framer-motion 12.29.2 - Animation library (required for motion effects throughout app)
- tailwindcss 4.1.18 - CSS framework (v4 latest with native CSS engine)

**Type Safety:**
- @types/react 19.2.5 - Type definitions for React
- @types/react-dom 19.2.3 - Type definitions for React DOM
- @types/node 24.10.1 - Node.js type definitions for build tools

## Configuration

**Environment:**
- No .env file detected - application appears to be client-side only with no external API calls
- No environment variables documented

**TypeScript:**
- `tsconfig.json` - Project root references
- `tsconfig.app.json` - App build config
  - Target: ES2022
  - Module: ESNext
  - JSX: react-jsx (automatic JSX transform)
  - Strict mode enabled
  - No unused locals/parameters allowed
  - Full type checking enabled
- `tsconfig.node.json` - Build tool config
  - Target: ES2023
  - Used for Vite config and build scripts

**Build:**
- `vite.config.ts` - Vite configuration
  - Plugins: React fast refresh + Tailwind CSS integration
  - No custom output configuration
  - Uses default Vite build optimization

**Linting:**
- `eslint.config.js` - Flat config format
  - Ignores: `dist/` directory
  - Applies to: `**/*.{ts,tsx}` files
  - Ecma version: 2020
  - Globals: Browser environment

## Platform Requirements

**Development:**
- Node.js (version not specified, should match package-lock.json requirements)
- npm (package manager)
- Modern terminal with git support

**Production:**
- Static file hosting (no backend required)
- Modern browser supporting ES2022+
- HTTP/HTTPS server to serve `dist/` files after build
- Recommended: CDN or static hosting (Vercel, Netlify, GitHub Pages, AWS S3, etc.)

## Build Scripts

**Available Commands:**
```bash
npm run dev        # Start Vite dev server with hot reload
npm run build      # TypeScript compile check + Vite production build
npm run lint       # Run ESLint on codebase
npm run preview    # Preview production build locally
```

**Build Output:**
- Destination: `dist/` directory
- Includes: Optimized JavaScript, CSS, and assets
- Ready for static hosting

## Dependencies Summary

**Total dependencies:** 5
- react, react-dom, tailwindcss, @tailwindcss/vite, framer-motion

**Total devDependencies:** 11
- TypeScript, Vite, ESLint ecosystem, type definitions, React plugins

---

*Stack analysis: 2026-01-31*
