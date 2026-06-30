import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useWindowWidth from '../hooks/useWindowWidth';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const width = useWindowWidth();
const isMobile = width < 768;

  // Form state — one object holding all fields
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  // Track validation errors
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect if cart is empty (e.g. user refreshed this page directly)
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  // Generic input handler — works for any field
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error for this field as soon as user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  // Validate all fields, return true if everything is okay
  function validate() {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{6,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  }

  function handlePlaceOrder() {
    if (!validate()) return; // stop if validation fails

    setSubmitting(true);

    // Simulate a network request (in a real app this would be an API call)
    setTimeout(() => {
      clearCart();
      navigate('/order-success', { state: { orderTotal: cartTotal, customerName: form.fullName } });
    }, 1200);
  }

  // Reusable input field renderer
  function renderField(name, label, placeholder, type = 'text') {
    return (
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#333' }}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '11px 14px',
            fontSize: '14px',
            border: `1px solid ${errors[name] ? '#ef4444' : '#e0e0e0'}`,
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
        />
        {errors[name] && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '28px' }}>
        Checkout
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>

        {/* Shipping form */}
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '28px',
          border: '1px solid #f0f0f0'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
            Shipping Information
          </h3>

          {renderField('fullName', 'Full Name', 'Abenet Tesfaye Haile')}
          {renderField('email', 'Email Address', 'you@example.com', 'email')}
          {renderField('address', 'Street Address', 'Bole, Addis Ababa')}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {renderField('city', 'City', 'Addis Ababa')}
            {renderField('phone', 'Phone Number', '0911 234 567', 'tel')}
          </div>
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
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
            Order Summary
          </h3>

          {/* Mini list of items */}
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13px',
                color: '#666',
                marginBottom: '8px'
              }}>
                <span style={{
                  maxWidth: '180px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.title} × {item.quantity}
                </span>
                <span style={{ flexShrink: 0, marginLeft: '8px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: '800' }}>
              <span>Total</span>
              <span style={{ color: '#e94560' }}>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={submitting}
            style={{
              width: '100%',
              padding: '14px',
              background: submitting ? '#999' : '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;