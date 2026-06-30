import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage on startup
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shopeasy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage every time cart changes
  useEffect(() => {
    localStorage.setItem('shopeasy_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item — if already in cart, increase quantity
  function addToCart(product) {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Remove item completely
  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  // Change quantity — remove if goes to 0
  function updateQuantity(id, amount) {
    setCartItems(prev =>
      prev
        .map(item => item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  // Clear whole cart (after checkout)
  function clearCart() {
    setCartItems([]);
  }

  // Total number of items (for badge on navbar)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}