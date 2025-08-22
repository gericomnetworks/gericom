import Image from "next/image";

interface ProductProps {
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-blue-600 font-bold mt-2">{price}</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
