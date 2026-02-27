"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import API from "@/utils/api";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products?limit=1000");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Auth check + load products
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchProducts();
    setCheckingAuth(false);
  }, []);

  // ✅ Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Image fallback
  const getSafeImageUrl = (url?: string) => {
    if (url && url.includes("res.cloudinary.com")) return url;
    return "/images/placeholder.png";
  };

  // ✅ Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 sm:mb-0">
          Products Dashboard
        </h2>

        <button
          onClick={() => router.push("/add-product")}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-md shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={getSafeImageUrl(p.image)}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="rounded-md object-cover border"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">{p.category}</td>

                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => router.push(`/edit-product/${p._id}`)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
