# External Integrations

**Analysis Date:** 2026-01-31

## APIs & External Services

**Not Detected**
- No external API clients or SDKs detected in package.json
- No API calls in source code analysis

## Data Storage

**Databases:**
- Not applicable - application is client-side only, no backend database connection

**File Storage:**
- Local filesystem only - images stored in `public/images/` directory
- No cloud storage integration detected

**Caching:**
- Not implemented - relies on browser HTTP caching headers

## Authentication & Identity

**Auth Provider:**
- Not implemented - no authentication system
- No auth libraries in dependencies

## Monitoring & Observability

**Error Tracking:**
- Not detected - no error reporting services integrated

**Logs:**
- Console logging only (standard `console.*` methods if used)
- No centralized logging service

## CI/CD & Deployment

**Hosting:**
- Not configured in codebase - requires external hosting platform
- Candidate platforms: Vercel, Netlify, GitHub Pages, AWS S3, CloudFlare Pages

**CI Pipeline:**
- Not detected - no GitHub Actions, GitLab CI, or other CI configuration found

## Environment Configuration

**Required env vars:**
- None - application is fully static client-side

**Secrets location:**
- Not applicable - no secrets management needed

## Webhooks & Callbacks

**Incoming:**
- None detected - no webhook endpoints

**Outgoing:**
- Contact form in `src/App.tsx` (lines 212-238) is a UI form only
- Form submission is not wired to any backend service
- No form handler detected in code
- Requires backend integration to process contact submissions

## Google Fonts Integration

**Fonts Used:**
- Connection: `https://fonts.googleapis.com` (preconnected in `index.html`)
- Fonts loaded:
  - DM Sans (weights: 400, 500, 600, 700) - Body text
  - Fraunces serif (weights: 400, 500, 600) - Headings
- Load method: CSS import in `src/index.css` with `display=swap`

## Image Assets

**Location:**
- `public/images/hero/` - Product and marketing images
- Referenced in `src/App.tsx` (product listings, hero section, about section)
- Note: Images are placeholder references; actual image files needed for production

## Third-Party Content

**Meta Information:**
- Open Graph tags for social sharing (`index.html`)
- No tracking pixels or analytics services detected

---

*Integration audit: 2026-01-31*

## Missing Integrations for Production

**Contact Form Processing:**
The contact form in the Contact section (`src/App.tsx`, lines 212-238) is currently a UI-only form with no backend handling. To enable contact submissions, integration with one of these services is recommended:
- Backend API endpoint
- Email service (SendGrid, Resend, etc.)
- Form service (Formspree, Basin, etc.)

**Analytics (Optional):**
Consider adding:
- Google Analytics
- Posthog
- Mixpanel
- Or similar for tracking user behavior

**E-commerce (If Needed):**
For actual sales transactions, integrate:
- Stripe or similar payment processor
- Shopping cart solution
- Inventory management system
