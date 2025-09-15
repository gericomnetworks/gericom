// components/AdminPanelClient.tsx
"use client";

import React, { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number; // This is in CENTS from API
  slug?: string | null;
  images: { id: string; url: string }[];
  category?: { id: string; name: string } | null;
  brand?: string | null;
  status: string;
  featured: boolean;
};

type Category = { id: string; name: string; slug: string };

type AdminUser = {
  id: string;
  clerkId: string;
  email: string;
  name?: string | null;
  role: string;
  createdAt: string;
};

export default function AdminPanelClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "", // This is in KES (user input)
    categoryName: "",
    categoryId: "",
    images: [] as string[],
    brand: "",
    status: "instock",
    featured: false
  });

const fetchProducts = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      // Handle both { products: [...] } or just [...]
      setProducts(Array.isArray(data) ? data : data.products || []);
    } else {
      setProducts([]);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]);
  }
  setLoading(false);
};

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchAdmins();
  }, []);

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
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
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Math.round(Number(form.price) * 100), // Convert to cents
        categoryId: form.categoryId || undefined,
        categoryName: form.categoryName || undefined,
        images: form.images,
        brand: form.brand || undefined,
        status: form.status,
        featured: form.featured
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setForm({ 
          id: "", 
          name: "", 
          description: "", 
          price: "", 
          categoryName: "", 
          categoryId: "", 
          images: [],
          brand: "",
          status: "instock",
          featured: false
        });
        fetchProducts();
        alert("Product created successfully");
      } else {
        const error = await res.json();
        alert("Error: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create product");
    }
  };

  const handleUpdate = async () => {
    if (!form.id) {
      alert("No product selected for update");
      return;
    }

    try {
      const payload = {
        id: form.id,
        name: form.name,
        description: form.description,
        price: Math.round(Number(form.price) * 100), // Convert to cents
        categoryId: form.categoryId || undefined,
        categoryName: form.categoryName || undefined,
        images: form.images,
        brand: form.brand || undefined,
        status: form.status,
        featured: form.featured
      };

      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setForm({ 
          id: "", 
          name: "", 
          description: "", 
          price: "", 
          categoryName: "", 
          categoryId: "", 
          images: [],
          brand: "",
          status: "instock",
          featured: false
        }); 
        fetchProducts();
        alert("Product updated successfully"); 
        console.log(payload)
        ;
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { 
        method: "DELETE" 
      });
      
      if (res.ok) {
        fetchProducts();
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  const startEdit = (product: Product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: String(product.price / 100), // Convert cents to KES for display
      categoryName: product.category ? product.category.name : "",
      categoryId: product.category ? product.category.id : "",
      images: product.images.map(img => img.url),
      brand: product.brand || "",
      status: product.status,
      featured: product.featured
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail) {
      alert("Please enter an email");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: newAdminEmail,
          name: newAdminEmail.split('@')[0]
        }),
      });
      
      if (res.ok) {
        setNewAdminEmail("");
        fetchAdmins();
        alert("Admin added successfully");
      } else {
        const error = await res.json();
        alert("Failed to add admin: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Add admin error:", error);
      alert("Failed to add admin");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "products" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "users" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "products" ? (
        <>
          {/* Product Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="font-semibold mb-4 text-lg">
              {form.id ? "Edit Product" : "Create New Product"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input 
                  placeholder="Product name" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price (KES) *</label>
                <input 
                  type="number"
                  placeholder="Price" 
                  value={form.price} 
                  onChange={(e) => setForm({ ...form, price: e.target.value })} 
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Category</label>
                <select 
                  value={form.categoryId} 
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value, categoryName: "" })} 
                  className="w-full border rounded p-2"
                >
                  <option value="">-- Select category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Or Create New Category</label>
                <input 
                  placeholder="New category name" 
                  value={form.categoryName} 
                  onChange={(e) => setForm({ ...form, categoryName: e.target.value, categoryId: "" })} 
                  className="w-full border rounded p-2"
                  disabled={!!form.categoryId}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input 
                  placeholder="Brand name" 
                  value={form.brand} 
                  onChange={(e) => setForm({ ...form, brand: e.target.value })} 
                  className="w-full border rounded p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  value={form.status} 
                  onChange={(e) => setForm({ ...form, status: e.target.value })} 
                  className="w-full border rounded p-2"
                >
                  <option value="instock">In Stock</option>
                  <option value="onsale">On Sale</option>
                  <option value="backorder">Backorder</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                placeholder="Product description" 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                className="w-full border rounded p-2"
                rows={3}
              />
            </div>

            <div className="mb-4 flex items-center">
              <input 
                type="checkbox" 
                checked={form.featured} 
                onChange={(e) => setForm({ ...form, featured: e.target.checked })} 
                className="mr-2"
                id="featured"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Product
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Images</label>
              <div className="flex gap-2 items-center mb-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={async (e) => { 
                    if (e.target.files && e.target.files[0]) {
                      await handleFileUpload(e.target.files[0]);
                    }
                  }} 
                  className="border rounded p-2"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {form.images.map((url, idx) => (
                  <div key={idx} className="border rounded p-2 relative">
                    <img 
                      src={url} 
                      alt="" 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button 
                      onClick={() => setForm((f) => ({ ...f, images: f.images.filter((x, i) => i !== idx) }))} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {form.id ? (
                <>
                  <button 
                    onClick={handleUpdate} 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Update Product
                  </button>
                  <button 
                    onClick={() => setForm({ 
                      id: "", 
                      name: "", 
                      description: "", 
                      price: "", 
                      categoryName: "", 
                      categoryId: "", 
                      images: [],
                      brand: "",
                      status: "instock",
                      featured: false
                    })} 
                    className="px-4 py-2 rounded border hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleCreate} 
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  disabled={!form.name || !form.price}
                >
                  Create Product
                </button>
              )}
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4 text-lg">Products ({products.length})</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No products found</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded p-4 flex items-start gap-4 hover:bg-gray-50">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={product.images[0]?.url || "/placeholder.png"} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-green-600">
                          KES {(product.price / 100).toLocaleString()} {/* Convert cents to KES */}
                        </span>
                        {product.brand && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {product.brand}
                          </span>
                        )}
                        {product.category && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product.category.name}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded ${
                          product.status === 'instock' ? 'bg-green-100 text-green-700' :
                          product.status === 'onsale' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.status}
                        </span>
                        {product.featured && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => startEdit(product)} 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Users Tab */
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4 text-lg">Admin Users</h2>
          
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-3">Add New Admin</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter user email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="border rounded p-2 flex-1"
              />
              <button 
                onClick={handleAddAdmin} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Admin
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Current Admins ({admins.length})</h3>
            
            {admins.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No admin users found</p>
            ) : (
              <div className="border rounded divide-y">
                {admins.map((admin) => (
                  <div key={admin.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{admin.name || admin.email}</p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                      <p className="text-xs text-gray-500">
                        Added: {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {admin.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}