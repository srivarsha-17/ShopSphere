import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

  return (
    <div className="card product-card">
      <Link to={`/products/${product.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Product Image */}
        <div className="product-image-wrap">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'}
            alt={product.name}
            loading="lazy"
          />
          {product.categoryName && (
            <span
              className="badge badge-neutral"
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
              }}
            >
              {product.categoryName}
            </span>
          )}

          {isOutOfStock ? (
            <span
              className="badge badge-danger"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span
              className="badge badge-warning"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              Only {product.stockQuantity} Left!
            </span>
          ) : null}
        </div>

        {/* Product Body */}
        <div className="product-body">
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b' }}>
              <Star size={14} fill="#f59e0b" />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>
              {product.rating ? product.rating.toFixed(1) : '4.5'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              (Verified)
            </span>
          </div>

          {/* Title */}
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>

          <p style={{
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4
          }}>
            {product.description}
          </p>

          {/* Price & Action Row */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
              <span className="product-price">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock || loading}
              className="btn btn-primary btn-sm"
              style={{ padding: '0.45rem 0.85rem' }}
              title={isOutOfStock ? 'Item is out of stock' : 'Add to cart'}
            >
              <ShoppingCart size={15} />
              <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
