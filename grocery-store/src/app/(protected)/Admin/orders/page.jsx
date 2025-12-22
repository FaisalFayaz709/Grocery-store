"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useOrders from "@/hooks/useOrder";

export default function AdminOrdersPage() {
  const { orders, fetchAllOrders, updateOrderStatus, loading } = useOrders();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-gray-100 text-gray-800",
      Processing: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      alert(`Order status updated to ${newStatus}`);
      fetchAllOrders();
    } else {
      alert(`Failed to update status: ${result.message}`);
    }
  };

  // ✅ Fixed: Use orderItems instead of items
  const getOrderItemCount = (order) => {
    return order.orderItems?.length || 0;
  };

  const getOrderTotalQuantity = (order) => {
    if (!order.orderItems) return 0;
    return order.orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#333333] mb-2">Order Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1))}
            className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition text-left ${
              filterStatus === (key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1)) ? "ring-2 ring-[#4CAF50]" : ""
            }`}
          >
            <p className="text-gray-600 text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <p className="text-3xl font-bold text-[#333333]">{value}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <input
          type="text"
          placeholder="Search by order ID, customer name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9F9F9] border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Customer Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Date & Time</th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Items (Qty)</th> */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#333333]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-[#F9F9F9] transition">
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#333333]">
                          #{order.id?.slice(0, 8)}...
                        </p>
                      </td>
                      
                      {/* ✅ Fixed: Use userName directly */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#333333]">
                          {order.userName || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{order.userEmail || "N/A"}</p>
                        {order.phone && (
                          <p className="text-sm text-gray-600">{order.phone}</p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-[#333333]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </td>

                      {/* ✅ Fixed: Call the function properly */}
                      {/* <td className="px-6 py-4">
                        <p className="text-[#333333] font-medium">
                          {getOrderItemCount(order)} items
                        </p>
                        <p className="text-sm text-gray-600">
                          {getOrderTotalQuantity(order)} total qty
                        </p>
                      </td> */}

                      <td className="px-6 py-4 font-bold text-[#4CAF50]">
                        ${order.totalAmount?.toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/Admin/orders/${order.id}`}>
                            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}