import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Check, Zap } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        if (res.data?.success && res.data?.data) {
          const prod = res.data.data;
          setProduct(prod);
          setQuantity(1);

          // Fetch related products from same category
          if (prod.categoryId) {
            const relRes = await api.get('/products', {
              params: { categoryId: prod.categoryId, size: 4 },
            });
            if (relRes.data?.success && relRes.data?.data?.content) {
              setRelatedProducts(relRes.data.data.content.filter((p) => p.id !== prod.id));
            }
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return <Spinner message="Loading product specifications..." />;
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity <= 0;

  const handleAddToCart = async () => {
    setActionLoading(true);
    await addToCart(product.id, quantity);
    setActionLoading(false);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setActionLoading(true);
    const res = await addToCart(product.id, quantity);
    setActionLoading(false);
    if (res?.success) {
      navigate('/cart');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Back button */}
      <Link
        to="/products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: '1.75rem',
        }}
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      {/* Main Product Showcase Card */}
      <div className="card" style={{ padding: '2.5rem 2rem', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Large Product Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
            }}>
              <img
                src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                alt={product.name}
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Product Details & Purchase Actions */}
          <div>
            {/* Category badge */}
            {product.categoryName && (
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                {product.categoryName}
              </span>
            )}

            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 800,
              color: 'var(--secondary)',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
            }}>
              {product.name}
            </h1>

            {/* Ratings & Stock Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b' }}>
                <Star size={18} fill="#f59e0b" />
                <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '0.95rem' }}>
                  {product.rating ? product.rating.toFixed(1) : '4.5'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>(50+ verified customer reviews)</span>
              </div>

              {isOutOfStock ? (
                <span className="badge badge-danger">Out of Stock</span>
              ) : (
                <span className="badge badge-success">
                  <Check size={12} /> In Stock ({product.stockQuantity} units available)
                </span>
              )}
            </div>

            {/* Price */}
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
            }}>
              ${Number(product.price).toFixed(2)}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Includes all applicable taxes
              </span>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Description
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            {!isOutOfStock ? (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Quantity:</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      style={{ padding: '0.5rem 0.85rem', background: 'var(--bg-subtle)' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ padding: '0.5rem 1.25rem', fontWeight: 700, fontSize: '0.95rem' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                      disabled={quantity >= product.stockQuantity}
                      style={{ padding: '0.5rem 0.85rem', background: 'var(--bg-subtle)' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Max: {product.stockQuantity}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleAddToCart}
                    disabled={actionLoading}
                    className="btn btn-secondary btn-lg"
                    style={{ flex: 1, minWidth: '180px' }}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={actionLoading}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, minWidth: '180px' }}
                  >
                    <Zap size={18} />
                    Buy Now (COD)
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                fontWeight: 600,
                marginBottom: '2rem',
              }}>
                This product is currently out of stock. Please check back later!
              </div>
            )}

            {/* Value Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                <Truck size={18} color="var(--primary)" />
                <span>Cash on Delivery available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                <ShieldCheck size={18} color="var(--accent)" />
                <span>Standard 1-year product warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem' }}>
            Customers Also Viewed
          </h2>
          <div className="grid-products">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
