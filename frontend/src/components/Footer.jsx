import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: '4rem', paddingTop: '3.5rem', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        {/* Value Proposition Banners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '12px', color: '#38bdf8' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700 }}>Free Delivery</h4>
              <p style={{ fontSize: '0.8rem' }}>On all Cash on Delivery orders</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '12px', color: '#34d399' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700 }}>100% Authentic</h4>
              <p style={{ fontSize: '0.8rem' }}>Verified quality products</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '12px', color: '#fbbf24' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700 }}>Hassle-Free Returns</h4>
              <p style={{ fontSize: '0.8rem' }}>Easy 14-day exchange policy</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '12px', color: '#a78bfa' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700 }}>24/7 Dedicated Support</h4>
              <p style={{ fontSize: '0.8rem' }}>Assistance whenever you need</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          padding: '3rem 0',
        }}>
          {/* Brand Info */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#ffffff', marginBottom: '1rem' }}>
              <div style={{ background: '#2563eb', color: '#fff', borderRadius: '8px', padding: '4px', display: 'flex' }}>
                <ShoppingBag size={18} />
              </div>
              ShopSphere
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              A modern, enterprise-grade e-commerce destination bringing top electronics, fashion, home essentials, and lifestyle products straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><Link to="/products" style={{ transition: 'color 0.2s' }}>All Products</Link></li>
              <li><Link to="/products?category=1">Electronics</Link></li>
              <li><Link to="/products?category=2">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=3">Home & Kitchen</Link></li>
              <li><Link to="/cart">My Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><span>Cash on Delivery (COD)</span></li>
              <li><span>Shipping & Returns</span></li>
              <li><span>Privacy & Terms</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              Subscribe to receive exclusive deals, secret coupons, and new product announcements.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to ShopSphere updates!'); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  flex: 1
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm">Join</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          padding: '1.75rem 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} ShopSphere E-Commerce Platform. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> using Spring Boot & React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
