"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Type of a wishlist entry
export type WishlistItem = {
  uid: string; // unique entry ID
  id: string;  // product ID
  name: string;
  price: number;
  image: string;
};

type WishlistState = Record<string, WishlistItem>;

type WishlistContextType = {
  wishlist: WishlistState;
  toggleWish: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  isWished: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistState>({});
  const { isSignedIn } = useUser();
  const router = useRouter();

  // ✅ Load from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setWishlist(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setWishlist({});
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.error("Failed to save wishlist:", err);
    }
  }, [wishlist]);

  // ✅ Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "wishlist" && e.newValue) {
        try {
          setWishlist(JSON.parse(e.newValue));
        } catch {
          console.error("Failed to sync wishlist across tabs");
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // ✅ Toggle wishlist (require login)
  function toggleWish(product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) {
    if (!isSignedIn) {
      router.push("/account");
      return;
    }

    setWishlist((prev) => {
      const copy = { ...prev };

      if (copy[product.id]) {
        delete copy[product.id]; // remove if exists
      } else {
        copy[product.id] = {
          uid: uuidv4(),
          ...product,
        };
      }

      return copy;
    });
  }

  function isWished(productId: string) {
    return !!wishlist[productId];
  }

  function clearWishlist() {
    setWishlist({});
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWish, isWished, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
