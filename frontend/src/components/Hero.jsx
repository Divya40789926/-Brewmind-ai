function Hero() {
  return (
    <section className="bg-black text-white min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        BrewMind AI
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        An intelligent coffee experience — personalized recommendations, 
        an AI barista, and premium coffee, all in one place.
      </p>
      <button className="bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition">
        Explore Menu
      </button>
    </section>
  );
}

export default Hero;