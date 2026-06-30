import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px 24px' }}>
      <p style={{ fontSize: '64px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>
        404
      </p>
      <h2 style={{ marginBottom: '8px' }}>Page Not Found</h2>
      <p style={{ color: '#888', marginBottom: '28px' }}>
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
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
        ← Back to Home
      </button>
    </div>
  );
}

export default NotFound;