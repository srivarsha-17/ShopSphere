import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="container" style={{ padding: '4rem 1.25rem', maxWidth: '640px' }}>
      <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
        {/* Success Icon */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'var(--accent-light)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <CheckCircle2 size={44} />
        </div>

        <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
          Order Confirmed
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
          Thank You For Your Order!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          Your order has been registered in the database and is being processed by our warehouse team.
        </p>

        {/* Order Details Highlight Box */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          textAlign: 'left',
          marginBottom: '2rem',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Order Reference:</span>
            <span style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.95rem' }}>
              {orderNumber}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Payment Method:</span>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              {order?.paymentMethod || 'Cash on Delivery (COD)'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Amount Payable on Delivery:</span>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--secondary)' }}>
              ${order?.totalAmount ? Number(order.totalAmount).toFixed(2) : '--'}
            </span>
          </div>

          {order?.shippingAddress && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                Delivery Address:
              </span>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {order.shippingName} • {order.shippingPhone}<br />
                {order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/orders" className="btn btn-primary btn-lg" style={{ flex: '1 1 200px' }}>
            <Package size={18} />
            View Order History
          </Link>
          <Link to="/products" className="btn btn-secondary btn-lg" style={{ flex: '1 1 200px' }}>
            <Home size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
