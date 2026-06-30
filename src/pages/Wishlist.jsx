import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🤍</p>
        <h2 style={{ marginBottom: '8px' }}>Your wishlist is empty</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          Tap the heart icon on any product to save it here.
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            background: '#e94560',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Browse Products →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '28px' }}>
        My Wishlist ({wishlistItems.length})
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {wishlistItems.map(item => (
          <div key={item.id} style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '20px',
            border: '1px solid #f0f0f0',
            position: 'relative'
          }}>
            <button
              onClick={() => removeFromWishlist(item.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              ✕
            </button>

            <div
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '12px' }}
            >
              <img src={item.image} alt={item.title} style={{ maxHeight: '130px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>

            <p style={{ fontSize: '13px', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {item.title}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', color: '#e94560' }}>${item.price}</span>
              <button
                onClick={() => addToCart(item)}
                style={{
                  background: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                + Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
