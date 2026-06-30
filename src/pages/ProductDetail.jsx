import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useWindowWidth from '../hooks/useWindowWidth';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const width = useWindowWidth();
const isMobile = width < 768;

  // Fetch the single product whenever the id in the URL changes
  useEffect(() => {
    setLoading(true);
    setAdded(false);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // re-runs every time id changes (e.g. navigating between products)

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // reset the "added" message after 2s
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
        <p style={{ fontSize: '32px' }}>⏳</p>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: '#bbb' }}>
        <p style={{ fontSize: '40px' }}>🔍</p>
        <p style={{ marginBottom: '16px' }}>Product not found</p>
        <Link to="/products" style={{ color: '#e94560', fontWeight: '600' }}>
          ← Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '24px', fontSize: '13px', color: '#888' }}>
        <Link to="/" style={{ color: '#888' }}>Home</Link>
        {' / '}
        <Link to="/products" style={{ color: '#888' }}>Products</Link>
        {' / '}
        <span style={{ color: '#333', textTransform: 'capitalize' }}>{product.category}</span>
      </div>

    <div style={{
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
  gap: isMobile ? '24px' : '48px',
  background: '#fff',
  borderRadius: '16px',
  padding: isMobile ? '20px' : '40px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
}}>

        {/* Image side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          borderRadius: '12px',
          padding: '40px'
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: '320px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Info side */}
        <div>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '20px',
            background: '#f0f4ff',
            color: '#4361ee',
            textTransform: 'capitalize'
          }}>
            {product.category}
          </span>

          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '14px 0 10px', lineHeight: '1.4' }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '18px' }}>
            <span style={{ color: '#f4a017' }}>
              {'★'.repeat(Math.round(product.rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            </span>
            <span style={{ fontSize: '13px', color: '#999' }}>
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <p style={{ fontSize: '32px', fontWeight: '800', color: '#e94560', marginBottom: '20px' }}>
            ${product.price}
          </p>

          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '28px' }}>
            {product.description}
          </p>

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Quantity</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ padding: '8px 14px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px' }}
              >
                −
              </button>
              <span style={{ padding: '8px 18px', fontSize: '14px', fontWeight: '600' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ padding: '8px 14px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '14px',
              background: added ? '#22c55e' : '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {added ? '✓ Added to Cart!' : `Add ${quantity} to Cart — $${(product.price * quantity).toFixed(2)}`}
          </button>

          {/* Go to cart link, shows after adding */}
          {added && (
            <button
              onClick={() => navigate('/cart')}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '12px',
                background: 'none',
                border: '1px solid #1a1a2e',
                color: '#1a1a2e',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              View Cart →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;