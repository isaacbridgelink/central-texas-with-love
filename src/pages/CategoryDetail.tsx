import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products, type Product } from '../data/products'
import { categories } from '../data/categories'
import { usePageSEO } from '../hooks/usePageSEO'

const seoTitles: Record<string, { title: string; description: string }> = {
    'under-50': {
        title: 'Handmade Art Under $50 | Affordable Gifts Austin TX — Central Texas with Love',
        description: 'Unique handcrafted driftwood & air plant sculptures under $50. Perfect affordable gifts made in Austin, Texas. Local delivery available.',
    },
    'lighting': {
        title: 'Driftwood Lamps & Lighting | Handmade in Austin TX — Central Texas with Love',
        description: 'Handcrafted driftwood lamps with coral stone and living air plants. Unique artisan lighting made in Austin, Texas.',
    },
    'decor': {
        title: 'Table Decor & Centerpieces | Handmade Driftwood Art Austin TX — Central Texas with Love',
        description: 'One-of-a-kind driftwood sculptures and table centerpieces with living air plants. Handcrafted in Austin, Texas.',
    },
    'backlight': {
        title: 'UV Reactive Blacklight Art | Handmade in Austin TX — Central Texas with Love',
        description: 'Stunning UV-reactive sculptures that glow under blacklight. Handcrafted from driftwood and coral stone in Austin, Texas.',
    },
}

export default function CategoryDetail() {
    const { slug } = useParams<{ slug: string }>()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const seo = slug ? seoTitles[slug] : null
    usePageSEO({
        title: seo?.title ?? 'Collection — Central Texas with Love',
        description: seo?.description,
    })

    const category = useMemo(() => categories.find(c => c.slug === slug), [slug])

    const filteredProducts = useMemo(() => {
        if (!category) return []

        return products.filter(p => {
            if (category.slug === 'decor') {
                return p.category === 'Table Decor' || p.category === 'Other'
            }
            return p.category === category.filterCategory
        })
    }, [category])

    if (!category) {
        return (
            <div className="section container" style={{ paddingTop: '140px', textAlign: 'center' }}>
                <h2 className="heading-lg">Category not found</h2>
                <Link to="/" className="btn-secondary" style={{ marginTop: '20px' }}>Back to Home</Link>
            </div>
        )
    }

    return (
        <>
            <section className="section" style={{ paddingTop: 'clamp(100px, 12vw, 140px)' }}>
                <div className="container">
                    <div style={{ marginBottom: '48px' }}>
                        <Link to="/" className="text-accent" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            ← BACK TO HOME
                        </Link>
                        <h1 className="heading-xl" style={{ marginBottom: '16px' }}>{category.title}</h1>
                        <p className="text-muted" style={{ maxWidth: '600px' }}>{category.description}</p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid-3">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="product-card"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="img-container">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{product.name}</h3>
                                        <p style={{ fontWeight: 700, color: 'var(--color-forest)' }}>${product.price}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '80px 0', textAlign: 'center', background: 'var(--color-cream-dark)', borderRadius: 'var(--radius-lg)' }}>
                            <p className="text-muted">No pieces currently available in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>

            {/* Product Structured Data */}
            {filteredProducts.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": category?.title,
                        "numberOfItems": filteredProducts.length,
                        "itemListElement": filteredProducts.map((p, i) => ({
                            "@type": "ListItem",
                            "position": i + 1,
                            "item": {
                                "@type": "Product",
                                "name": p.name,
                                "description": p.description,
                                "image": `https://centraltexaswithlove.com${p.image}`,
                                "brand": { "@type": "Brand", "name": "Central Texas with Love" },
                                "offers": {
                                    "@type": "Offer",
                                    "price": p.price,
                                    "priceCurrency": "USD",
                                    "availability": "https://schema.org/InStock",
                                    "seller": { "@type": "Organization", "name": "Central Texas with Love" }
                                }
                            }
                        }))
                    }) }}
                />
            )}
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
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100 }}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: 'fixed', inset: '20px', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className="card product-modal-card" style={{ position: 'relative', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', padding: 0 }}>
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', zIndex: 110, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '14px' }}
                    >
                        ✕
                    </button>
                    <div className="product-modal-grid">
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                            <p className="text-accent" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '6px' }}>
                                {product.category.toUpperCase()}
                            </p>
                            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>{product.name}</h2>
                            <p className="text-accent" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>${product.price}</p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                {product.tags.map(tag => (
                                    <span key={tag} className="category-tag">{tag}</span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '24px', padding: '10px 14px', background: 'var(--color-cream-dark)', borderRadius: 'var(--radius-md)', marginBottom: '14px', fontSize: '13px' }}>
                                <div>
                                    <span className="text-muted" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>DIMENSIONS </span>
                                    <span style={{ fontWeight: 500 }}>{product.dimensions}</span>
                                </div>
                                <div>
                                    <span className="text-muted" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>WEIGHT </span>
                                    <span style={{ fontWeight: 500 }}>{product.weight}</span>
                                </div>
                            </div>
                            <Link
                                to={`/contact?piece=${product.id}`}
                                className="btn-primary"
                                style={{ justifyContent: 'center', fontSize: '14px', padding: '12px 24px' }}
                            >
                                Inquire About This Piece
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
