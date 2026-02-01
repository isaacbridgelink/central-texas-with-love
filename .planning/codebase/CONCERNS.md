# Codebase Concerns

**Analysis Date:** 2026-01-31

## Tech Debt

**Hardcoded Data in App.tsx:**
- Issue: Product data duplicated in both `src/App.tsx` (lines 4-11) and `src/data/products.ts` (lines 16-98). App.tsx maintains a simplified version with minimal fields while products.ts has complete product information. This creates maintenance burden and risk of inconsistency.
- Files: `src/App.tsx`, `src/data/products.ts`
- Impact: Changes to product data must be made in two places. Simplified artworks array in App.tsx serves filtering on home page but doesn't match actual product structure, creating confusion about source of truth.
- Fix approach: Remove hardcoded artworks array from App.tsx and use the products data from `src/data/products.ts` exclusively. Update home page filtering logic to work with actual product structure.

**Component Interface Duplication:**
- Issue: Product interface defined in multiple files: `src/data/products.ts` (lines 1-13), `src/components/ProductCard.tsx` (lines 4-16), `src/components/ProductModal.tsx` (lines 4-16), `src/components/ProductGrid.tsx` (lines 4-16).
- Files: `src/data/products.ts`, `src/components/ProductCard.tsx`, `src/components/ProductModal.tsx`, `src/components/ProductGrid.tsx`
- Impact: Difficult to maintain Product interface consistency. Changes require updates across 4 files. Risk of interface drift between files.
- Fix approach: Export Product interface from `src/data/products.ts` and import it in all component files. Create single source of truth for type definitions.

**Form State Not Managed:**
- Issue: Contact form in `src/App.tsx` (lines 212-238) has input fields but no state management, validation, or submission logic.
- Files: `src/App.tsx`
- Impact: Form is non-functional. User submissions are lost. No feedback provided to user.
- Fix approach: Add useState hooks for form fields, implement form validation, add submission handler, integrate with email service or backend API.

**Unused State Variable:**
- Issue: CustomCursor component in `src/components/CustomCursor.tsx` (line 5) declares `setMousePosition` but never uses it. Should be removed.
- Files: `src/components/CustomCursor.tsx`
- Impact: Minor code clutter. ESLint should catch this but indicates incomplete refactoring.
- Fix approach: Remove unused state variable: `const [, setMousePosition] = useState({ x: 0, y: 0 })`

**Hardcoded Image Paths:**
- Issue: All image paths hardcoded throughout components (Hero, About, Footer, etc.). Many paths reference `/images/hero/unnamed.jpg` or similar placeholder paths without actual image files present in repo.
- Files: `src/App.tsx`, `src/components/Hero.tsx`, `src/components/About.tsx`, `src/components/ProductCard.tsx`, `src/components/Footer.tsx`, `src/data/products.ts`
- Impact: Images won't load in production. No fallback or error handling for missing images.
- Fix approach: Implement image management system. Add image existence validation. Create image config or mapping. Provide fallback placeholders.

**Navigation Decoupling:**
- Issue: Multiple navigation systems exist: direct anchor links in `src/App.tsx` and separate `src/components/Navigation.tsx` component that isn't used in main App. Navigation component defines its own navItems array (lines 9-16) rather than consuming from shared config.
- Files: `src/App.tsx`, `src/components/Navigation.tsx`
- Impact: Navigation structure defined in multiple places. Changes to navigation require updates in multiple files. Component not integrated with main app.
- Fix approach: Create shared navigation config. Integrate Navigation component into main layout if needed. Consolidate navigation sources.

**CategoryFilter Logic Scattered:**
- Issue: Category filtering duplicated across multiple locations. App.tsx filters products inline (lines 141, 161, 181). ProductGrid would need separate logic. No shared filter utilities.
- Files: `src/App.tsx`, `src/components/ProductGrid.tsx`
- Impact: Inconsistent filtering across app. Difficult to maintain filter logic.
- Fix approach: Extract category filtering into utility functions in `src/data/products.ts`. Reuse across components.

## Known Bugs

**Contact Form Non-functional:**
- Symptoms: Submit button has no handler; form inputs don't persist or validate; no success/error feedback
- Files: `src/App.tsx` (lines 212-238)
- Trigger: User fills out contact form and clicks "Send Message"
- Workaround: User must contact directly via email link in footer/navigation

**Missing Product Images:**
- Symptoms: Product images fail to load; placeholder paths appear in console as 404 errors
- Files: `src/data/products.ts`, `src/components/Hero.tsx`, `src/components/About.tsx`, all product display components
- Trigger: Page load - any image references to `/images/hero/` paths
- Workaround: Images never appear; could add alt text for SEO but actual product showcase is broken

**Navigation Component Unused:**
- Symptoms: Navigation component exists but is never rendered or connected to main app
- Files: `src/components/Navigation.tsx`
- Trigger: App loads - separate navigation component never initialized
- Workaround: Uses inline navbar in App.tsx instead

**Modal Contact Link Hardcoded Email:**
- Symptoms: Contact CTA in ProductModal uses mailto link without form, inconsistent with main contact section
- Files: `src/components/ProductModal.tsx` (line 163)
- Trigger: User clicks "Contact Me About This Piece" button in product modal
- Workaround: Works as mailto, but doesn't track which product user inquired about

## Security Considerations

**Email Address Exposed:**
- Risk: Email address `evan@centraltexaswithlove.com` hardcoded throughout application in multiple mailto: links. Exposed to email scraping bots.
- Files: `src/components/ProductModal.tsx` (line 163), `src/components/Navigation.tsx` (lines 72, 139), `src/components/Footer.tsx` (line 42)
- Current mitigation: None - email is in plain text
- Recommendations: Move email to environment variables. Consider using contact form backend instead of mailto. Implement email obfuscation for client-side display.

**No Input Validation:**
- Risk: Contact form has no validation, sanitization, or rate limiting. Could be abused if form backend is added.
- Files: `src/App.tsx` (lines 212-238)
- Current mitigation: None
- Recommendations: Add client-side validation. Implement backend rate limiting. Sanitize inputs before sending to email/backend.

**Missing Content Security Policy:**
- Risk: No CSP headers defined. Could allow injection attacks if backend is added.
- Files: `index.html`
- Current mitigation: None
- Recommendations: Add CSP meta tags to HTML. Restrict font loading to Google Fonts only. Validate all external resources.

**Unvalidated External Font Loading:**
- Risk: Google Fonts loaded over HTTPS in index.html (line 17) but no integrity checking. CDN compromise could inject malicious code.
- Files: `index.html` (lines 17-18)
- Current mitigation: HTTPS connection
- Recommendations: Add Subresource Integrity (SRI) hashes to font links if possible.

## Performance Bottlenecks

**Framer Motion Animation on Every Component:**
- Problem: Heavy use of Framer Motion animations on almost every element. CustomCursor component constantly updates on mousemove event (lines 14-18 in `src/components/CustomCursor.tsx`). Multiple useSpring instances, scroll listeners, and animation loops running simultaneously.
- Files: `src/components/CustomCursor.tsx`, `src/components/Hero.tsx`, `src/components/ProductCard.tsx`, `src/components/ProductModal.tsx`, `src/components/About.tsx`
- Cause: No performance optimization. Every animation runs at full throttle without debouncing or frame rate limiting. CustomCursor updates on every mousemove event without throttling.
- Improvement path: Add event throttling to CustomCursor mousemove handler. Use will-change CSS selectively. Consider disabling animations on low-end devices. Profile with Chrome DevTools to identify expensive animations.

**Image Loading Not Optimized:**
- Problem: All images loaded as full-size. No lazy loading implemented for below-fold images. Large hero images loaded immediately on page load.
- Files: `src/components/Hero.tsx`, `src/components/About.tsx`, `src/components/ProductCard.tsx`
- Cause: No lazy loading library integrated. Images loaded as regular img tags without loading="lazy" attribute.
- Improvement path: Add loading="lazy" attribute to img tags. Consider implementing image optimization with Next.js Image component or similar. Implement responsive image sizes.

**Unused Navigation Component Loaded:**
- Problem: Navigation component defined but never used, still bundled in application.
- Files: `src/components/Navigation.tsx`
- Cause: Component created but not imported or rendered anywhere
- Improvement path: Either integrate Navigation component into app or delete completely.

**Floating Leaf Animation Loop:**
- Problem: Hero component creates 6 animated decorative elements with infinite animation loop (Hero.tsx lines 27-47). All animate continuously regardless of visibility.
- Files: `src/components/Hero.tsx`
- Cause: `repeat: Infinity` on animation transitions without visibility-based optimization
- Improvement path: Pause animations when not in viewport using Intersection Observer or Framer Motion's whileInView.

## Fragile Areas

**App.tsx Main Component:**
- Files: `src/App.tsx`
- Why fragile: Monolithic 265-line component containing entire page structure, all sections (navbar, hero, about, products, contact, footer), hardcoded product data, form markup, and navigation logic. No separation of concerns.
- Safe modification: Extract each section into separate component files. Create dedicated layout component. Move state management up. Break apart by section (Navbar, ProductSections, ContactSection).
- Test coverage: No tests exist. No error boundaries.

**Product Data System:**
- Files: `src/data/products.ts`, `src/App.tsx` (hardcoded artworks)
- Why fragile: Product data defined in two places with inconsistent structures. Filtering logic duplicated. No centralized data access layer.
- Safe modification: Consolidate all product data in products.ts. Export filtering utilities. Update all components to import from single source.
- Test coverage: No validation of product interface consistency.

**Navigation/Routing:**
- Files: `src/App.tsx` (inline anchors), `src/components/Navigation.tsx` (unused), `src/components/ProductModal.tsx` (mailto links)
- Why fragile: Navigation split across multiple implementations. URL navigation via hash links not coordinated. No routing library.
- Safe modification: Choose single navigation approach. Consolidate into one system. Consider React Router if complexity increases.
- Test coverage: No tests for navigation flow.

**Image Management:**
- Files: Multiple across components and data
- Why fragile: Image paths hardcoded everywhere. No validation that images exist. Placeholder paths used throughout.
- Safe modification: Create image config file. Validate image paths on build. Add fallback images.
- Test coverage: No image asset testing.

**CustomCursor Component:**
- Files: `src/components/CustomCursor.tsx`
- Why fragile: Multiple event listeners without debouncing. Directly manipulates Framer Motion spring values on every mousemove. Unused state variable indicates incomplete refactoring.
- Safe modification: Add event debouncing. Remove unused state. Consider disabling on touch devices (already checked at line 55 but inefficiently).
- Test coverage: No tests.

## Scaling Limits

**Contact Form Non-Functional:**
- Current capacity: 0 (no backend integration)
- Limit: Contact form cannot scale to handle actual inquiries without backend implementation
- Scaling path: Add backend API endpoint for form submissions, email service integration, database for inquiry tracking, rate limiting

**Product Data Structure:**
- Current capacity: 6 hardcoded products in two places
- Limit: Cannot efficiently manage more than a dozen products with current manual data duplication approach
- Scaling path: Implement product management system with database, admin interface, image upload system

**Image Storage:**
- Current capacity: Assumes static image files in public/images/hero
- Limit: Manual image management doesn't scale for frequent product updates or high-resolution imagery
- Scaling path: Integrate CDN or static file hosting, image optimization pipeline, responsive image generation

**Payment/E-commerce:**
- Current capacity: Not supported
- Limit: No ability to process orders or payments
- Scaling path: Integrate payment processor (Stripe/PayPal), shopping cart, order management system, inventory tracking

## Dependencies at Risk

**Google Fonts CDN Dependency:**
- Risk: Loads fonts from external Google CDN. If CDN is down, fonts fail to load. Network latency impacts page load.
- Impact: Fonts fall back to system fonts, changing page appearance
- Migration plan: Self-host font files using font subsetting, implement local font fallbacks, or switch to system font stack

**Framer Motion Heavy Usage:**
- Risk: Application heavily dependent on Framer Motion for UX. Version updates could break animations. Bundle size impact significant (~40KB).
- Impact: Core UX (animations, cursor, modals) would break if library has breaking changes
- Migration plan: Reduce animation complexity, use CSS animations for simpler effects, evaluate smaller animation libraries

**React 19 Early Adoption:**
- Risk: Using React 19.2.0 which is relatively new. Potential bugs in edge cases not yet discovered.
- Impact: Unexpected behavior, performance issues, compatibility problems with ecosystem packages
- Migration plan: Keep updated but watch for major releases, monitor React issues, have rollback plan to React 18

## Missing Critical Features

**Contact Form Backend:**
- Problem: Contact form exists but has no submission handler, validation, or email integration
- Blocks: Cannot accept customer inquiries, request custom orders, or communicate with customers
- Current state: Non-functional placeholder form

**Product Checkout/Payment:**
- Problem: No shopping cart, checkout flow, or payment processing
- Blocks: Cannot actually sell products
- Current state: Product display only, no transaction capability

**Product Images:**
- Problem: All product images reference missing paths (`/images/hero/unnamed.jpg`)
- Blocks: Cannot display actual product visuals
- Current state: Broken image placeholders throughout

**Product Management:**
- Problem: Products hardcoded in data file with no admin interface
- Blocks: Cannot easily add/update/remove products without code changes
- Current state: Manual data editing required

**SEO Optimization:**
- Problem: No meta tags beyond basic description. No structured data (Schema.org). No sitemap.
- Blocks: Poor search visibility, no rich snippets for social sharing
- Current state: Minimal SEO implementation

**Analytics:**
- Problem: No page view tracking, user behavior analytics, or conversion tracking
- Blocks: Cannot measure traffic, user engagement, or sales conversion
- Current state: No visibility into user behavior

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: Entire application lacks any unit, integration, or E2E tests
- Files: All source files
- Risk: Cannot detect regressions, breaking changes caught only through manual testing. High risk of bugs in production.
- Priority: **High** - Should implement test suite before scaling product management or adding backend

**No Form Validation Testing:**
- What's not tested: Contact form validation (if/when implemented)
- Files: `src/App.tsx` (contact form)
- Risk: Invalid data could be submitted to backend without proper validation
- Priority: **High** - Critical if contact form backend is added

**No Navigation Testing:**
- What's not tested: Navigation between sections, anchor link functionality, scroll behavior
- Files: `src/App.tsx`, `src/components/Navigation.tsx`
- Risk: Navigation breaks silently. Users cannot reliably navigate to desired sections.
- Priority: **Medium** - Important for UX but not data-critical

**No Component Rendering Tests:**
- What's not tested: ProductCard, ProductModal, ProductGrid, About, Footer component rendering
- Files: `src/components/`
- Risk: Component prop changes break UI without detection
- Priority: **Medium** - Component changes could silently break UI

**No Performance Testing:**
- What's not tested: Animation performance, bundle size, Core Web Vitals
- Files: All animation-heavy components
- Risk: Performance degradation not detected. Page may become slow without notice.
- Priority: **Medium** - Important for user experience

**No Image Loading Testing:**
- What's not tested: Image fallbacks, broken image handling, responsive image sizing
- Files: All components with images
- Risk: Image failures not detected until user reports issues
- Priority: **Low** - Currently all images are broken anyway, so gaps are moot

---

*Concerns audit: 2026-01-31*
