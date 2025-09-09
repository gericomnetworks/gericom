export default function HeroBanner() {
  return (
    <section className="relative bg-gray-900 text-white text-center py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to Gericom Cameras
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 px-2">
          High-quality surveillance and security solutions for every need.
        </p>
        <a
          href="/shop"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
