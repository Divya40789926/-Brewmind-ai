import ProductCard from '../components/ProductCard';
import products from '../data/products';

function Menu({ addToCart }) {
  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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