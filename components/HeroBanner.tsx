export default function HeroBanner() {
  return (
    <section className="relative bg-gray-900 text-white text-center py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Welcome to Gericom Cameras</h1>
        <p className="text-lg text-gray-300 mb-6">
          High-quality surveillance and security solutions for every need.
        </p>
        <a
          href="/shop"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
