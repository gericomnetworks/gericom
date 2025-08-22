export default function ProductGrid() {
  const products = [
    { id: 1, name: "Camera A", price: "Ksh 10,000", image: "/cam1.jpg" },
    { id: 2, name: "Camera B", price: "Ksh 15,000", image: "/cam2.jpg" },
  ]
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="border rounded-lg p-4 hover:shadow-lg">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-2 font-semibold">{p.name}</h3>
            <p className="text-red-600">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}