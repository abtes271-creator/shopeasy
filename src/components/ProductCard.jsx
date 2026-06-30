import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // add this

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist(); // add this

  const wishlisted = isWishlisted(product.id); // add this

  return (
    <div style={{
      background: '#fff',
      borderRadius: '14px',
      padding: '20px',
      border: '1px solid #f0f0f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative',
      overflow: 'hidden'
    }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      {/* Category badge */}
      <span style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        fontSize: '10px',
        fontWeight: '600',
        padding: '3px 8px',
        borderRadius: '20px',
        background: '#f0f4ff',
        color: '#4361ee',
        textTransform: 'capitalize'
      }}>
        {product.category}
      </span>

      {/* NEW — Wishlist heart button */}
      <button
        onClick={() => toggleWishlist(product)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.9)',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          zIndex: 1,
          transition: 'transform 0.15s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* rest of the card stays exactly the same — image, title, rating, price, add to cart */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '14px',
          cursor: 'pointer',
          paddingTop: '20px'
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        />
      </div>

      <p
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          fontSize: '13px',
          fontWeight: '500',
          color: '#333',
          marginBottom: '6px',
          cursor: 'pointer',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.5'
        }}
      >
        {product.title}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <span style={{ color: '#f4a017', fontSize: '12px' }}>
          {'★'.repeat(Math.round(product.rating?.rate || 0))}
          {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
        </span>
        <span style={{ fontSize: '11px', color: '#999' }}>
          ({product.rating?.count})
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#e94560' }}>
          ${product.price}
        </span>
        <button
          onClick={() => addToCart(product)}
          style={{
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.target.style.background = '#e94560'}
          onMouseOut={e => e.target.style.background = '#1a1a2e'}
        >
          + Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;