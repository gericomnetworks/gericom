import Image from "next/image";

interface ProductProps {
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-blue-600 font-bold mt-2 text-sm sm:text-base">{price}</p>

        <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
