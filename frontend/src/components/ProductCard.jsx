function ProductCard({ name, price, image, onAdd }) {
  return (
    <div className="bg-neutral-900 text-white rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-amber-400 font-medium mt-1">₹{price}</p>
        <button
          onClick={onAdd}
          className="mt-3 w-full bg-amber-400 text-black font-medium py-2 rounded-lg hover:bg-amber-300 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;