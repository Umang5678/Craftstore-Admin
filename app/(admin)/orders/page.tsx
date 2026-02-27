"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import API from "../../../utils/api";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items: {
    name: string;
    size: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await API.put(`/orders/${id}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          🧾 Customer Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
            No orders found
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((o) => (
              <div
                key={o._id}
                onClick={() => setSelectedOrder(o)}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {o.customer.name}
                  </h2>
                  <p className="text-sm text-gray-500">{o.customer.email}</p>
                  <p className="text-sm text-gray-500">{o.customer.phone}</p>
                  <p className="text-sm text-gray-500">
                    {o.customer.city}, {o.customer.state}
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-300 dark:border-gray-700 pt-3 mb-3">
                  {o.items.slice(0, 2).map((i, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={
                            i.image?.includes("res.cloudinary.com")
                              ? i.image
                              : "/images/placeholder.png"
                          }
                          alt={i.name}
                          fill
                          sizes="40px"
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {i.name} × {i.quantity}
                      </p>
                    </div>
                  ))}
                  {o.items.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{o.items.length - 2} more items
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-gray-300 dark:border-gray-700 pt-3">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                    ₹{o.total}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : o.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : o.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🪟 Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transform scale-100 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* 🧍 Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  Customer Info
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Name:</strong> {selectedOrder.customer.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Email:</strong> {selectedOrder.customer.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Phone:</strong> {selectedOrder.customer.phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Address:</strong> {selectedOrder.customer.address},{" "}
                  {selectedOrder.customer.city}, {selectedOrder.customer.state}{" "}
                  - {selectedOrder.customer.pincode},{" "}
                </p>
              </div>

              {/* 🛍️ Ordered Items */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Ordered Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((i, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-md overflow-hidden">
                          <Image
                            src={
                              i.image?.includes("res.cloudinary.com")
                                ? i.image
                                : "/images/placeholder.png"
                            }
                            alt={i.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            {i.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {i.size} × {i.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-indigo-600 font-semibold">
                        ₹{i.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 💰 Total + Status */}
              <div className="border-t pt-3 flex justify-between items-center">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  Total:
                </p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">
                  ₹{selectedOrder.total}
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <p className="text-sm text-gray-500">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(selectedOrder._id, e.target.value)
                  }
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 dark:border-gray-700 p-4 flex justify-end bg-gray-50 dark:bg-gray-900">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
