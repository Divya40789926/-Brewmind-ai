import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="bg-black text-white min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold mb-4"
      >
        BrewMind AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-400 text-lg mb-8 max-w-xl"
      >
        An intelligent coffee experience — personalized recommendations,
        an AI barista, and premium coffee, all in one place.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition"
      >
        Explore Menu
      </motion.button>
    </section>
  );
}

export default Hero;