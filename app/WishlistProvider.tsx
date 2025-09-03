"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

// Type of a wishlist entry (now includes product details)
export type WishlistItem = {
  uid: string; // unique ID for the wishlist entry
  id: string;  // product ID
  name: string;
  price: number;
  image: string;
};

type WishlistState = Record<string, WishlistItem>; 
// Example: { "p1": { uid: "abc123", id: "p1", name: "Product A", ... } }

type WishlistContextType = {
  wishlist: WishlistState;
  toggleWish: (product: { id: string; name: string; price: number; image: string }) => void;
  isWished: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistState>({});

  // ✅ Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to load wishlist:", err);
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

  function toggleWish(product: { id: string; name: string; price: number; image: string }) {
    setWishlist((prev) => {
      const copy = { ...prev };

      if (copy[product.id]) {
        // remove if already exists
        delete copy[product.id];
      } else {
        // add full product details with unique uid
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

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWish, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
