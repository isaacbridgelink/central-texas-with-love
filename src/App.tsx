import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CategoryDetail from './pages/CategoryDetail'

const navItems = [
  { label: 'ABOUT', href: '/about' },
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t overflow-hidden"
              style={{ borderColor: 'var(--color-stone)', backgroundColor: 'var(--color-cream)' }}
            >
              <div className="px-[5%] py-6 space-y-4">
                {navItems.map((item) => (
                  item.href.startsWith('/') && !item.href.includes('#') ? (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 text-sm font-semibold tracking-widest"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-sm font-semibold tracking-widest"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.label}
                    </a>
                  )
                ))}
                <Link to="/contact" className="btn-primary inline-block mt-4" onClick={() => setMenuOpen(false)}>
                  Get In Touch
                </Link>
              </div>
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
