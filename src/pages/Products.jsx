import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

function Products() {
  const {
    products,
    totalProducts,
    categories,
    loading,
    error,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
  } = useProducts();

  // Read category from URL if coming from Home page category buttons
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams, setActiveCategory]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Page header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>
          All Products
        </h1>
        <p style={{ color: '#888', fontSize: '14px' }}>
          {loading ? 'Loading...' : `Showing ${products.length} of ${totalProducts} products`}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <span style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '18px'
        }}>
          🔍
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 14px 14px 44px',
            fontSize: '14px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#e94560'}
          onBlur={e => e.target.style.borderColor = '#e0e0e0'}
        />
        {/* Clear button */}
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: '30px',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#e94560' : '#e0e0e0',
              background: activeCategory === cat ? '#e94560' : '#fff',
              color: activeCategory === cat ? '#fff' : '#555',
              fontSize: '13px',
              fontWeight: activeCategory === cat ? '600' : '400',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
          <p style={{ fontSize: '36px', marginBottom: '12px' }}>⏳</p>
          <p>Fetching products...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '10px',
          padding: '20px',
          color: '#b91c1c',
          textAlign: 'center'
        }}>
          <p>Something went wrong: {error}</p>
        </div>
      )}

      {/* Empty search result */}
      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#bbb' }}>
          <p style={{ fontSize: '40px' }}>🔍</p>
          <p style={{ fontSize: '16px', marginTop: '12px' }}>
            No products found for "<strong>{search}</strong>"
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all'); }}
            style={{
              marginTop: '16px',
              background: '#e94560',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '30px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && products.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;