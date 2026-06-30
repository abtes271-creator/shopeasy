import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Load from localStorage on startup
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('shopeasy_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopeasy_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add or remove — toggle behavior
  function toggleWishlist(product) {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id); // remove
      }
      return [...prev, product]; // add
    });
  }

  // Check if a specific product is already wishlisted
  function isWishlisted(id) {
    return wishlistItems.some(item => item.id === id);
  }

  function removeFromWishlist(id) {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      wishlistCount: wishlistItems.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}