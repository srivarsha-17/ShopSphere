import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const CartPage = () => {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2rem' }}>
          <ShoppingBag size={48} color="var(--primary)" style={{ margin: '0 auto 1.25rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Cart is Waiting</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please sign in to view items in your shopping bag and proceed to checkout.
          </p>
          <Link to="/login" className="btn btn-primary btn-block">
            Sign In to View Cart
          </Link>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--text-muted)',
          }}>
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Looks like you haven't added anything to your cart yet. Explore our wide product range and great deals!
          </p>
          <Link to="/products" className="btn btn-primary btn-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
        Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Review your items, update quantities, or proceed to secure delivery
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* Cart Items List */}
        <div style={{ flex: '2 1 600px' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1.25rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--bg-subtle)',
                    flexShrink: 0,
                  }}>
                    <img
                      src={item.productImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                      alt={item.productName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: '1 1 200px' }}>
                    <Link
                      to={`/products/${item.productId}`}
                      style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.25rem' }}
                    >
                      {item.productName}
                    </Link>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Unit Price: ${Number(item.unitPrice).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || loading}
                      style={{ padding: '0.4rem 0.65rem', background: 'var(--bg-subtle)' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: '0.4rem 0.85rem', fontWeight: 700, fontSize: '0.9rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.availableStock || loading}
                      style={{ padding: '0.4rem 0.65rem', background: 'var(--bg-subtle)' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      ${Number(item.subtotal).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: 'var(--danger)', padding: '0.4rem' }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary Checkout Card */}
        <div style={{ flex: '1 1 320px' }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal ({cartCount} items)</span>
                <span style={{ fontWeight: 600 }}>${Number(cartTotal).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Standard Shipping</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>FREE (COD Promo)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Taxes</span>
                <span style={{ fontWeight: 600 }}>$0.00</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              marginBottom: '1.5rem',
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>Total Amount</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                ${Number(cartTotal).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-block btn-lg"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            {/* Guarantees */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="var(--primary)" />
                <span>Express doorstep delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--accent)" />
                <span>Pay safely upon arrival with Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
