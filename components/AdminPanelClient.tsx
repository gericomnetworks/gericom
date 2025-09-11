// components/AdminPanelClient.tsx
"use client";

import React, { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  slug?: string | null;
  images: { id: string; url: string }[];
  category?: { id: string; name: string } | null;
};

type Category = { id: string; name: string };

export default function AdminPanelClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    categoryName: "",
    categoryId: "",
    images: [] as string[],
  });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // derive categories from products
    const map = new Map<string, Category>();
    products.forEach((p) => {
      if (p.category) map.set(p.category.id, p.category);
    });
    setCategories(Array.from(map.values()));
  }, [products]);

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, data: base64 }),
      });
      const json = await res.json();
      if (json.url) {
        setForm((f) => ({ ...f, images: [...f.images, json.url] }));
      } else {
        alert("Upload failed");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      price: Math.round(Number(form.price) || 0),
      categoryId: form.categoryId || undefined,
      categoryName: form.categoryName || undefined,
      images: form.images,
    };
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm({ id: "", name: "", description: "", price: "", categoryName: "", categoryId: "", images: [] });
      fetchProducts();
      alert("Product created");
    } else {
      const err = await res.json();
      alert("Error: " + (err.error || "unknown"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchProducts();
    } else {
      alert("Failed to delete");
    }
  };

  const startEdit = (p: Product) => {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      categoryName: p.category ? p.category.name : "",
      categoryId: p.category ? p.category.id : "",
      images: (p.images || []).map((i) => i.url),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async () => {
    if (!form.id) return alert("No product selected");
    const payload = {
      id: form.id,
      name: form.name,
      description: form.description,
      price: Math.round(Number(form.price) || 0),
      categoryId: form.categoryId || null,
      images: form.images,
    };
    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm({ id: "", name: "", description: "", price: "", categoryName: "", categoryId: "", images: [] });
      fetchProducts();
      alert("Product updated");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="font-semibold mb-3">Create / Edit Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded p-2" />
          <input placeholder="Price (KES)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border rounded p-2" />
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="border rounded p-2">
            <option value="">-- Select category --</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input placeholder="Or create new category" value={form.categoryName} onChange={(e) => setForm({ ...form, categoryName: e.target.value })} className="border rounded p-2" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border rounded p-2 md:col-span-2" />
          <div className="md:col-span-2">
            <label className="block mb-2">Images</label>
            <div className="flex gap-2 items-center mb-2">
              <input type="file" accept="image/*" onChange={async (e) => { if (e.target.files && e.target.files[0]) await handleFile(e.target.files[0]); }} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {form.images.map((url, idx) => (
                <div key={idx} className="border rounded p-1">
                  <img src={url} alt="" style={{ width: 120, height: 80, objectFit: "cover" }} />
                  <div className="flex justify-between gap-2 mt-1">
                    <button onClick={() => setForm((f) => ({ ...f, images: f.images.filter((x, i) => i !== idx) }))} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex gap-2">
            {form.id ? (
              <>
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
                <button onClick={() => setForm({ id: "", name: "", description: "", price: "", categoryName: "", categoryId: "", images: [] })} className="px-4 py-2 rounded border">Cancel</button>
              </>
            ) : (
              <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Create Product</button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-semibold mb-4">Products</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border rounded p-3 flex items-start gap-4">
                <div style={{ width: 120, height: 90 }}>
                  <img src={p.images[0]?.url ?? "/placeholder.png"} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">KES {p.price.toLocaleString()}</span>
                    <button onClick={() => startEdit(p)} className="text-sm px-2 py-1 border rounded">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
