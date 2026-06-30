import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import useWindowWidth from '../hooks/useWindowWidth';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const width = useWindowWidth();
  const { theme, toggleTheme } = useTheme();

  const isMobile = width < 600;

  const navLink = (path, label) => (
    <Link
      key={path}
      to={path}
      style={{
        color: location.pathname === path ? '#fff' : 'rgba(255,255,255,0.75)',
        fontSize: '14px',
        fontWeight: location.pathname === path ? '600' : '400',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        background: '#1a1a2e',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: '#fff',
          fontSize: '20px',
          fontWeight: '700',
          letterSpacing: '-0.5px',
          textDecoration: 'none',
        }}
      >
        Shop<span style={{ color: '#e94560' }}>Easy</span>
      </Link>

      {/* Navigation, Theme Toggle, Wishlist & Cart — all in ONE flex group */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '16px' : '28px',
        }}
      >
        {!isMobile && navLink('/', 'Home')}
        {navLink('/products', isMobile ? 'Shop' : 'Products')}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.85)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          style={{
            position: 'relative',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '20px' }}>🤍</span>

          {wishlistCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#e94560',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          style={{
            position: 'relative',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '20px' }}>🛒</span>

          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#e94560',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;