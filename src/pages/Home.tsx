import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { type Product } from '../data/products'
import { categories } from '../data/categories'
import { useProductsContext } from '../context/ProductsContext'

export default function Home() {
  const { featuredProducts } = useProductsContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      {/* Hero - Full Viewport */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img
            src="/images/hero/panorama.jpg"
            alt="Handcrafted driftwood and air plant sculptures collection by Central Texas with Love, Austin Texas"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-glass-panel"
            style={{
              background: 'rgba(250, 249, 246, 0.97)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(28px, 5vw, 48px) clamp(24px, 6vw, 60px)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid hsla(0, 0%, 0%, 0.06)'
            }}
          >
            <h1 className="hero-title" style={{ fontFamily: "'Kaushan Script', cursive", textShadow: 'none', marginBottom: '20px' }}>
              <span className="hero-shimmer">Central Texas</span><br />
              <span className="hero-shimmer">with </span><span className="hero-shimmer-accent">Love</span>
            </h1>
            <p className="hero-subtitle" style={{ color: 'var(--color-text-muted)', fontSize: '18px', maxWidth: '440px' }}>
              Handcrafted in Austin from Texas driftwood, holy rock, and living air plants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section bg-forest">
        <div className="container">
          <div className="grid-4">
            {[
              { num: '01', title: 'Handcrafted', desc: 'Each piece meticulously made by hand' },
              { num: '02', title: 'Local Materials', desc: 'Sourced from Central Texas' },
              { num: '03', title: 'Living Art', desc: 'Real air plants that thrive' },
              { num: '04', title: 'Made with Love', desc: 'Made in Austin with a 100% love guarantee' },
            ].map((item) => (
              <div
                key={item.num}
                style={{ textAlign: 'center' }}
              >
                <p style={{ fontSize: '32px', fontWeight: 700, opacity: 0.3, marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>
                  {item.num}
                </p>
                <h3 className="heading-md" style={{ marginBottom: '8px', color: 'white' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="section bg-cream-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '16px', textTransform: 'uppercase' }}>
              The Collection
            </p>
            <h2 className="heading-lg">Explore Our Creations</h2>
          </div>
          <div className="grid-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Link to={`/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-card" style={{ background: 'transparent' }}>
                    <div className="img-container" style={{ aspectRatio: '1/1', boxShadow: 'var(--shadow-md)' }}>
                      <img
                        src={cat.image}
                        alt={`${cat.title} — handcrafted driftwood and air plant art, Austin Texas`}
                        style={{ transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))', opacity: 0, transition: 'opacity 0.4s' }} className="card-overlay" />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <h3 className="heading-md" style={{ fontSize: '20px', marginBottom: '8px' }}>{cat.title}</h3>
                      <p className="text-accent" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>VIEW COLLECTION →</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-forest">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              HOW IT WORKS
            </p>
            <h2 className="heading-lg" style={{ color: 'white' }}>From Nature to Your Home</h2>
          </div>
          <div className="grid-4">
            {[
              { step: '01', title: 'Source', desc: 'Gathered from Central Texas Natural Areas' },
              { step: '02', title: 'Design', desc: 'Thoughtfully arranged compositions' },
              { step: '03', title: 'Craft', desc: 'Carefully handcrafted with customization options' },
              { step: '04', title: 'Deliver', desc: 'Hand-delivered across Austin' },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{item.step}</span>
                </div>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="section bg-cream">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 64px)' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '16px', textTransform: 'uppercase' }}>
              Collection
            </p>
            <h2 className="heading-lg">Featured Pieces</h2>
            <p className="text-muted" style={{ marginTop: '16px', fontSize: '17px' }}>Each sculpture is a unique testament to nature's artistry.</p>
          </div>
          <div className="grid-3">
            {featuredProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="product-card"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="card" style={{ padding: '12px', background: 'white' }}>
                  <div className="img-container" style={{ aspectRatio: '4/5', marginBottom: '20px' }}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div style={{ padding: '0 8px 12px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>{item.name}</h3>
                    <p className="text-muted" style={{ fontSize: '14px' }}>${item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cream-dark">
        <div className="container">
          <div
            className="card"
            style={{ textAlign: 'center', padding: 'clamp(32px, 6vw, 60px) clamp(20px, 5vw, 40px)', maxWidth: '600px', margin: '0 auto' }}
          >
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              READY TO START?
            </p>
            <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
              Let's Create Something <span className="text-accent">Unique</span>
            </h2>
            <p className="text-muted" style={{ marginBottom: '28px' }}>
              Have questions or want a custom piece? Based in Austin — I'd love to hear from you.
            </p>
            <Link to="/contact" className="btn-primary">Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function ProductModal({ product, onClose }: {
  product: Product
  onClose: () => void
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="modal-wrapper"
        style={{ position: 'fixed', inset: '20px', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="card product-modal-card" style={{ position: 'relative', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: 0 }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '14px' }}
          >
            ✕
          </button>
          <div className="modal-image-container">
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="modal-details" style={{ paddingBottom: '28px' }}>
            <div>
              <p className="text-accent" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>
                {product.category.toUpperCase()}
              </p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>{product.name}</h2>
              <p className="text-accent" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>${product.price}</p>
              <div style={{ display: 'flex', gap: '24px', padding: '8px 14px', background: 'var(--color-cream-dark)', borderRadius: 'var(--radius-md)', marginBottom: '8px', fontSize: '13px' }}>
                <div>
                  <span className="text-muted" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>DIMENSIONS </span>
                  <span style={{ fontWeight: 500 }}>{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>WEIGHT </span>
                  <span style={{ fontWeight: 500 }}>{product.weight}</span>
                </div>
              </div>
            </div>
            <Link
              to={`/contact?piece=${product.id}`}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '12px 24px' }}
            >
              Inquire About This Piece
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}
