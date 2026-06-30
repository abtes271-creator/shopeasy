import { useState, useEffect } from 'react';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch all products
  useEffect(() => {
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(r => r.json()),
      fetch('https://fakestoreapi.com/products/categories').then(r => r.json())
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter products by search AND category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    products: filteredProducts,
    totalProducts: products.length,
    categories,
    loading,
    error,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
  };
}

export default useProducts;