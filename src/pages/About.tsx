import { Link } from 'react-router-dom'
import { usePageSEO } from '../hooks/usePageSEO'

export default function About() {
  usePageSEO({
    title: 'About Evan — Handcrafted Driftwood Art | Central Texas with Love, Austin TX',
    description: 'Meet Evan, the Austin artist behind Central Texas with Love. Handcrafted driftwood sculptures with living air plants and UV-reactive elements, made in Austin, Texas.',
  })

  return (
    <div style={{ paddingTop: 'clamp(80px, 10vw, 100px)' }}>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Image */}
            <div>
              <div className="img-container" style={{ aspectRatio: '4/5', maxWidth: '380px' }}>
                <img src="/images/hero/family.jpg" alt="Evan, Austin Texas driftwood artist and creator of Central Texas with Love" />
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="label" style={{ marginBottom: '20px' }}>About the Artist</span>
              <h1 className="heading-xl" style={{ marginBottom: '20px' }}>
                Hi, I'm <span className="text-accent">Evan</span>
              </h1>
              <p className="text-lg text-muted" style={{ marginBottom: '16px' }}>
                Every piece I create tells a story. What started as a hobby collecting
                driftwood along Central Texas rivers has evolved into a passion for
                creating living art right here in Austin.
              </p>
              <p className="text-lg text-muted" style={{ marginBottom: '32px' }}>
                I pair weathered driftwood and coral stone with living air plants that
                require almost no maintenance. But the real magic? Hidden fluorescent
                pigments that transform each piece under UV light.
              </p>
              <Link to="/contact" className="btn-primary">Work With Me</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-cream-dark">
        <div className="container">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              THE STORY
            </p>
            <h2 className="heading-lg" style={{ marginBottom: '32px' }}>
              From Hobby to <span className="text-accent">Passion</span>
            </h2>
            <div className="card" style={{ textAlign: 'left' }}>
              <p className="text-muted" style={{ marginBottom: '20px', lineHeight: 1.8 }}>
                It all started on a family trip to the Texas Hill Country. While my kids
                played in the river, I found myself drawn to the beautiful, sun-bleached
                driftwood scattered along the banks. I brought a few pieces home, not
                knowing what I'd do with them.
              </p>
              <p className="text-muted" style={{ marginBottom: '20px', lineHeight: 1.8 }}>
                Months later, experimenting with air plants and UV-reactive paints, I
                created my first piece. When I turned on the blacklight and saw those
                hidden colors emerge, I was hooked.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                Now I spend my weekends hunting for the perfect materials and my evenings
                bringing them to life. Every sculpture is one-of-a-kind, made with love
                right here in Austin, Texas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="text-accent" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '12px' }}>
              WHAT MAKES US DIFFERENT
            </p>
            <h2 className="heading-lg">Our Values</h2>
          </div>
          <div className="grid-4">
            {[
              { num: '01', title: 'Handcrafted', desc: 'Each piece meticulously crafted by hand. No two are ever the same.' },
              { num: '02', title: 'Local Materials', desc: 'Driftwood and coral sourced from Central Texas rivers and beaches.' },
              { num: '03', title: 'Living Art', desc: 'Real air plants that thrive with minimal care and last for years.' },
              { num: '04', title: 'UV Magic', desc: 'Hidden fluorescent elements reveal secret dimensions under blacklight.' },
            ].map((item) => (
              <div
                key={item.num}
                className="card"
                style={{ textAlign: 'center' }}
              >
                <p className="text-accent" style={{ fontSize: '32px', fontWeight: 700, opacity: 0.3, marginBottom: '8px' }}>
                  {item.num}
                </p>
                <h3 className="heading-md" style={{ marginBottom: '8px' }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: '14px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-forest">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <h2 className="heading-lg" style={{ color: 'white', marginBottom: '16px' }}>
              Ready to Own a Piece?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
              Browse our collection of one-of-a-kind sculptures or get in touch for a custom creation. Local Austin delivery available.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#shop" className="btn-primary" style={{ background: 'white', color: 'var(--color-forest)' }}>
                Shop Collection
              </a>
              <Link to="/contact" className="btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
