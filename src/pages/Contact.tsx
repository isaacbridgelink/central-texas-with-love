import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { usePageSEO } from '../hooks/usePageSEO'

export default function Contact() {
  usePageSEO({
    title: 'Contact — Handmade Art Inquiries & Local Delivery | Central Texas with Love, Austin TX',
    description: 'Get in touch about handcrafted driftwood sculptures, custom orders, or local Austin delivery. $10 minimum delivery, $1/lb anywhere in Austin.',
  })
  const [searchParams] = useSearchParams()
  const pieceId = searchParams.get('piece')
  const product = pieceId ? getProductById(pieceId) : null

  const [subject, setSubject] = useState('General Inquiry')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (product) {
      setSubject('Interested in a Piece')
      setMessage(`Hi! I'm interested in the "${product.name}" piece ($${product.price}). Could you tell me more about availability?`)
    }
  }, [product])

  return (
    <div style={{ paddingTop: '90px' }}>
      {/* Hero */}
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Left - Info */}
            <div>
              <span className="label" style={{ marginBottom: '20px' }}>Get In Touch</span>
              <h1 className="heading-xl" style={{ marginBottom: '20px' }}>
                Let's <span className="text-accent">Connect</span>
              </h1>
              <p className="text-lg text-muted" style={{ marginBottom: '40px', maxWidth: '400px' }}>
                Interested in a piece? Want a custom creation? Have questions about UV
                reactivity or plant care? I'd love to hear from you.
              </p>

              {/* Delivery Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px' }}>🚗</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>Delivery</p>
                    <p className="text-muted" style={{ fontSize: '14px' }}>$10 minimum, $1/lb — Anywhere in Austin</p>
                  </div>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px' }}>🏠</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>Free Pickup</p>
                    <p className="text-muted" style={{ fontSize: '14px' }}>At my home studio</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📍</span> Austin, Texas
                </p>
                <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📧</span> evan@centraltexaswithlove.com
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {product && (
                <div className="card" style={{ display: 'flex', gap: '16px', padding: '16px', marginBottom: '20px', alignItems: 'center' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="text-accent" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2px' }}>
                      INQUIRING ABOUT
                    </p>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: 700 }}>${product.price}</p>
                  </div>
                  <p className="text-muted" style={{ fontSize: '12px', flexShrink: 0 }}>{product.dimensions}</p>
                </div>
              )}
              <div className="card" style={{ padding: '32px' }}>
                <h2 className="heading-md" style={{ marginBottom: '28px' }}>Send a Message</h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-name-email" style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Name</label>
                      <input type="text" placeholder="Your name" className="input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Email</label>
                      <input type="email" placeholder="your@email.com" className="input" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Phone</label>
                    <input type="tel" placeholder="(512) 555-1234" className="input" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Subject</label>
                    <select className="input" value={subject} onChange={e => setSubject(e.target.value)}>
                      <option>General Inquiry</option>
                      <option>Interested in a Piece</option>
                      <option>Custom Order Request</option>
                      <option>Delivery Question</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell me what you're looking for..."
                      className="input"
                      style={{ resize: 'none' }}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              FREQUENTLY ASKED
            </p>
            <h2 className="heading-lg">Common Questions</h2>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: 'How do I care for the air plants?',
                a: "Air plants are incredibly low-maintenance. Simply mist them with water once a week, or soak them for 20 minutes every two weeks. Keep them in indirect light and they'll thrive for years.",
              },
              {
                q: 'Do I need a special UV light?',
                a: 'Any blacklight or UV flashlight will work! You can find inexpensive UV bulbs at most hardware stores. The fluorescent elements will glow beautifully under any UV source.',
              },
              {
                q: 'Can I request a custom piece?',
                a: "Absolutely! I love creating custom pieces. Send me a message with your ideas, preferred size, and any specific materials you'd like.",
              },
              {
                q: 'How are pieces delivered?',
                a: 'I personally deliver anywhere in Austin — $10 minimum, $1 per pound. Free pickup is also available at my home studio.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card"
              >
                <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '10px' }}>{item.q}</h3>
                <p className="text-muted" style={{ lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I care for the air plants?",
              "acceptedAnswer": { "@type": "Answer", "text": "Air plants are incredibly low-maintenance. Simply mist them with water once a week, or soak them for 20 minutes every two weeks. Keep them in indirect light and they'll thrive for years." }
            },
            {
              "@type": "Question",
              "name": "Do I need a special UV light?",
              "acceptedAnswer": { "@type": "Answer", "text": "Any blacklight or UV flashlight will work! You can find inexpensive UV bulbs at most hardware stores. The fluorescent elements will glow beautifully under any UV source." }
            },
            {
              "@type": "Question",
              "name": "Can I request a custom piece?",
              "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Send a message with your ideas, preferred size, and any specific materials you'd like." }
            },
            {
              "@type": "Question",
              "name": "How are pieces delivered in Austin?",
              "acceptedAnswer": { "@type": "Answer", "text": "We personally deliver anywhere in Austin — $10 minimum, $1 per pound. Free pickup is also available at the home studio." }
            }
          ]
        }) }}
      />
    </div>
  )
}
