import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('query') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data?.success) setCategories(res.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Update state when search params change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  // Fetch Products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          size: 12,
          sortBy: sortBy,
          sortDir: sortDir,
        };
        if (selectedCategory) params.categoryId = selectedCategory;
        if (searchQuery.trim()) params.query = searchQuery.trim();

        const res = await api.get('/products', { params });
        if (res.data?.success && res.data?.data) {
          const pageData = res.data.data;
          setProducts(pageData.content || []);
          setTotalPages(pageData.totalPages || 1);
          setTotalElements(pageData.totalElements || 0);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy, sortDir, currentPage]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(0);
    const newParams = new URLSearchParams(searchParams);
    if (catId) {
      newParams.set('category', catId);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('query', searchQuery.trim());
    } else {
      newParams.delete('query');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'price-asc') {
      setSortBy('price');
      setSortDir('asc');
    } else if (value === 'price-desc') {
      setSortBy('price');
      setSortDir('desc');
    } else if (value === 'rating') {
      setSortBy('rating');
      setSortDir('desc');
    } else {
      setSortBy('id');
      setSortDir('asc');
    }
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('id');
    setSortDir('asc');
    setCurrentPage(0);
    setSearchParams({});
  };

  const displayedProducts = inStockOnly
    ? products.filter((p) => p.stockQuantity > 0)
    : products;

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
          Explore Products Catalog
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Showing {totalElements} items {searchQuery && `matching "${searchQuery}"`}
        </p>
      </div>

      {/* Control Bar: Search, Category Pills & Sort */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', flex: '1 1 300px', maxWidth: '450px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by keyword, item, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          </form>

          {/* Sort Dropdown & Stock Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              In Stock Only
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <select
                className="form-select"
                onChange={handleSortChange}
                defaultValue="default"
                style={{ width: 'auto', padding: '0.55rem 0.85rem', fontSize: '0.875rem' }}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          paddingTop: '1.25rem',
          marginTop: '1rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          <button
            onClick={() => handleCategoryChange('')}
            className={`btn btn-sm ${selectedCategory === '' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(String(cat.id))}
              className={`btn btn-sm ${selectedCategory === String(cat.id) ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Spinner message="Loading products catalog..." />
      ) : displayedProducts.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--text-muted)',
          }}>
            <Filter size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No products match your criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Try adjusting your search query, selecting another category, or removing active filters.
          </p>
          <button onClick={clearAllFilters} className="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid-products">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="btn btn-secondary btn-sm"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`btn btn-sm ${currentPage === idx ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="btn btn-secondary btn-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
