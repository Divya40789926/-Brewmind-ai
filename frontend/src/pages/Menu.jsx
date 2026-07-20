import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

function Menu({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8 text-white bg-black min-h-screen">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400 bg-black min-h-screen">{error}</div>;
  }

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAdd={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;