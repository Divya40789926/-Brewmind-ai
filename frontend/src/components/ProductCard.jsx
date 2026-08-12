import { motion } from 'framer-motion';

function ProductCard({ name, price, image, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className="bg-neutral-900 text-white rounded-xl overflow-hidden transition-transform duration-200"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-amber-400 font-medium mt-1">₹{price}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="mt-3 w-full bg-amber-400 text-black font-medium py-2 rounded-lg hover:bg-amber-300 transition"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;