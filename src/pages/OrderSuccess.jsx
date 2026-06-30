import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the data passed from Checkout via navigate state
  const { orderTotal, customerName } = location.state || {};

  // Generate a fake order number once when page loads
  const [orderNumber] = useState(() =>
    'SE-' + Math.floor(100000 + Math.random() * 900000)
  );

  // Safety check — if someone visits this URL directly without checking out
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center'
    }}>
      {/* Success icon */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: '36px'
      }}>
        ✅
      </div>

      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px' }}>
        Order Placed!
      </h1>

      <p style={{ color: '#666', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
        Thank you{customerName ? `, ${customerName.split(' ')[0]}` : ''}! Your order has
        been received and is being processed.
      </p>

      {/* Order details card */}
      <div style={{
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '14px',
        padding: '24px',
        marginBottom: '28px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14px' }}>
          <span style={{ color: '#888' }}>Order Number</span>
          <span style={{ fontWeight: '700' }}>{orderNumber}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
          <span style={{ color: '#888' }}>Total Paid</span>
          <span style={{ fontWeight: '700', color: '#e94560' }}>
            ${orderTotal?.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/products')}
        style={{
          background: '#e94560',
          color: 'white',
          border: 'none',
          padding: '14px 36px',
          borderRadius: '30px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Continue Shopping →
      </button>
    </div>
  );
}

export default OrderSuccess;