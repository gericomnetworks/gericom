// components/ProductCard.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/CartProvider";
import { useUser } from "@clerk/nextjs";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductProps) {
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isSignedIn) {
      // redirect to account page for sign-in. Clerk modal is also available on /account.
      router.push(`/account?from=product:${id}`);
      return;
    }

    addToCart({ id, name: title, price, image });
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white flex flex-col">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-blue-600 font-bold mt-2 text-sm sm:text-base">{`Ksh${price.toLocaleString()}`}</p>

        <button
          onClick={handleAddToCart}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
