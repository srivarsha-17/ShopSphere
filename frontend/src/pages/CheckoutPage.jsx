import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, ArrowRight, Banknote, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const CheckoutPage = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    shippingName: user?.name || '',
    shippingPhone: user?.phone || '',
    shippingAddress: user?.address || '',
    shippingCity: user?.city || '',
    shippingState: user?.state || '',
    shippingPostalCode: user?.postalCode || '',
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setShippingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!shippingData.shippingName || !shippingData.shippingPhone || !shippingData.shippingAddress ||
        !shippingData.shippingCity || !shippingData.shippingState || !shippingData.shippingPostalCode) {
      setErrorMessage('Please complete all delivery address fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/orders', shippingData);

      if (res.data?.success && res.data?.data) {
        const placedOrder = res.data.data;
        addToast('Order placed successfully!', 'success');
        // Clear local cart state
        await clearCart();
        navigate(`/order-success/${placedOrder.orderNumber}`, { state: { order: placedOrder } });
      } else {
        throw new Error(res.data?.message || 'Failed to place order');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'An error occurred while placing your order';
      setErrorMessage(msg);
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>No items to checkout</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
        Checkout & Delivery
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Enter delivery details and confirm your Cash on Delivery order
      </p>

      {errorMessage && (
        <div style={{
          background: 'var(--danger-light)',
          color: 'var(--danger)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontWeight: 600,
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* Shipping Form & Payment Method */}
          <div style={{ flex: '2 1 500px' }}>
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <MapPin size={22} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>
                  1. Shipping & Delivery Address
                </h2>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="shippingName">Recipient Full Name *</label>
                <input
                  id="shippingName"
                  name="shippingName"
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={shippingData.shippingName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="shippingPhone">Contact Phone Number *</label>
                <input
                  id="shippingPhone"
                  name="shippingPhone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 555-0199"
                  value={shippingData.shippingPhone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="shippingAddress">Street Address / Apartment *</label>
                <input
                  id="shippingAddress"
                  name="shippingAddress"
                  type="text"
                  className="form-input"
                  placeholder="456 Sunset Boulevard, Suite 10"
                  value={shippingData.shippingAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="shippingCity">City *</label>
                  <input
                    id="shippingCity"
                    name="shippingCity"
                    type="text"
                    className="form-input"
                    placeholder="New York"
                    value={shippingData.shippingCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="shippingState">State *</label>
                  <input
                    id="shippingState"
                    name="shippingState"
                    type="text"
                    className="form-input"
                    placeholder="NY"
                    value={shippingData.shippingState}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="shippingPostalCode">Postal Code *</label>
                  <input
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    type="text"
                    className="form-input"
                    placeholder="10001"
                    value={shippingData.shippingPostalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <Banknote size={22} color="var(--accent)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>
                  2. Payment Method
                </h2>
              </div>

              <div style={{
                border: '2px solid var(--primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--secondary)' }}>
                      Cash on Delivery (COD)
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      Pay safely with cash or mobile UPI when the courier arrives at your door
                    </p>
                  </div>
                </div>
                <span className="badge badge-success">Selected</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ flex: '1 1 340px' }}>
            <div className="card" style={{ padding: '1.75rem', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.25rem' }}>
                Order Summary ({cartCount} items)
              </h3>

              {/* Items Preview */}
              <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingRight: '0.25rem' }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.productImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'}
                        alt={item.productName}
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <p style={{ fontWeight: 600, maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.productName}
                        </p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Qty: {item.quantity} × ${Number(item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700 }}>${Number(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>${Number(cartTotal).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Delivery Charge</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>FREE</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.85rem',
                  marginTop: '0.5rem',
                }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>Grand Total</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                    ${Number(cartTotal).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-block btn-lg"
                style={{ marginTop: '1.5rem' }}
              >
                {submitting ? 'Placing Order...' : 'Confirm & Place Order'}
                {!submitting && <ArrowRight size={18} />}
              </button>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                By clicking Confirm, you agree to inspect and pay for your package upon delivery.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
