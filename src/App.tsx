import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CategoryDetail from './pages/CategoryDetail'
import { ProductsProvider } from './context/ProductsContext'

const navItems = [
  { label: 'ABOUT', href: '/about' },
  { label: 'FEATURED', href: '/#shop' },
  { label: 'SHOP', href: '/#categories' },
  { label: 'CONTACT', href: '/contact' },
]

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change and handle hash scrolling
  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0)
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
        style={{ backgroundColor: 'rgba(250, 249, 246, 0.98)' }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            {/* Logo - bigger */}
            <Link to="/">
              <img src="/images/hero/logo.png" alt="Central Texas with Love" className="nav-logo" />
            </Link>

            {/* Desktop Nav - centered */}
            <nav className="hidden lg:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center', gap: '40px' }}>
              {navItems.map((item) => (
                item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            {/* CTA */}
            <Link to="/contact" className="hidden lg:block btn-primary">
              Get In Touch
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden ml-auto p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden"
              style={{
                position: 'fixed',
                top: '80px',
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'var(--color-cream)',
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {navItems.map((item, index) => (
                item.href.startsWith('/') && !item.href.includes('#') ? (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '14px 32px',
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '14px 32px',
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                )
              ))}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.08 }}
                style={{ marginTop: '16px' }}
              >
                <Link to="/contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
                  Get In Touch
                </Link>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      {children}

      {/* Footer - Minimalist */}
      <footer style={{ backgroundColor: 'var(--color-forest)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
            <img src="/images/hero/logo.png" alt="Central Texas with Love" className="footer-logo" />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              © {new Date().getFullYear()} Central Texas with Love · Handcrafted in Austin, Texas
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </BrowserRouter>
  )
}
