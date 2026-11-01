import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, ShoppingBag, Tag } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/categories'),
        ]);

        if (prodRes.data?.success) setFeaturedProducts(prodRes.data.data);
        if (catRes.data?.success) setCategories(catRes.data.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '4.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '3rem',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              color: '#60a5fa',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}>
              <Sparkles size={16} />
              Season Mega Sale • Up to 40% Off
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}>
              Curated Electronics & Lifestyle Essentials.
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '520px',
            }}>
              Experience frictionless shopping with verified reviews, express delivery, and 100% Cash on Delivery protection across top global categories.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore All Products
                <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=1" className="btn btn-secondary btn-lg" style={{ background: 'transparent', color: '#fff', borderColor: '#475569' }}>
                Featured Electronics
              </Link>
            </div>
          </div>

          {/* Hero Banner Visual Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="Featured Headset"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
                padding: '2rem 1.5rem 1.5rem',
              }}>
                <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Bestseller</span>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>AuraSound Pro Wireless</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Active noise cancelling with 40-hour battery life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--secondary)' }}>
                Shop by Popular Categories
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                Browse our wide collection of curated departments
              </p>
            </div>
            <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid-categories">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="card"
                  style={{
                    overflow: 'hidden',
                    textAlign: 'center',
                    padding: '1.25rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '0.85rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <img
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80'}
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.2rem' }}>
                    {cat.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {cat.productCount ? `${cat.productCount} Items` : 'Explore'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section style={{ padding: '3rem 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'var(--primary-light)', padding: '0.6rem', borderRadius: '10px', color: 'var(--primary)' }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  Featured Products
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  Handpicked favorites with the highest verified ratings
                </p>
              </div>
            </div>
            <Link to="/products" className="btn btn-secondary btn-sm">
              See All Products
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid-products">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Deal Banner */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#93c5fd', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <Tag size={18} />
                LIMITED TIME COLLEGE PROMO
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Ready to Upgrade Your Everyday Setup?
              </h2>
              <p style={{ color: '#dbeafe', fontSize: '1rem', maxWidth: '550px' }}>
                Order today with zero upfront risk. Inspect your items upon delivery and pay conveniently in cash with Cash on Delivery (COD).
              </p>
            </div>
            <Link to="/products" className="btn" style={{ background: '#ffffff', color: '#1e40af', padding: '0.85rem 1.85rem', fontSize: '1rem', fontWeight: 700 }}>
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
