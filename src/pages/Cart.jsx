import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useWindowWidth from '../hooks/useWindowWidth';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const width = useWindowWidth();
const isMobile = width < 768;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</p>
        <h2 style={{ marginBottom: '8px' }}>Your cart is empty</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          Looks like you haven't added anything yet.
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
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '28px' }}>
        Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
      </h1>

<div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', gap: '32px' }}>
        {/* Cart items list */}
        <div>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '16px',
                background: '#fff',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '14px',
                border: '1px solid #f0f0f0',
                alignItems: 'center'
              }}
            >
              {/* Image */}
              <div style={{
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src={item.image} alt={item.title} style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#e94560' }}>
                  ${item.price}
                </p>
              </div>

              {/* Quantity controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  style={{ padding: '6px 12px', border: 'none', background: '#f5f5f5', cursor: 'pointer' }}
                >
                  −
                </button>
                <span style={{ padding: '6px 14px', fontSize: '14px', fontWeight: '600' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  style={{ padding: '6px 12px', border: 'none', background: '#f5f5f5', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <p style={{ width: '70px', textAlign: 'right', fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '24px',
          border: '1px solid #f0f0f0',
          height: 'fit-content',
          position: 'sticky',
          top: '84px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            <span>Shipping</span>
            <span style={{ color: '#22c55e', fontWeight: '600' }}>Free</span>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: '800' }}>
              <span>Total</span>
              <span style={{ color: '#e94560' }}>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            style={{
              width: '100%',
              padding: '14px',
              background: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Proceed to Checkout
          </button>

          <Link to="/products" style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '13px',
            color: '#888'
          }}>
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;