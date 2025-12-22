"use client";

import { useState } from "react";

/**
 * OrderTable Component
 * Reusable table for displaying and managing orders in admin panel
 * 
 * Usage:
 * <OrderTable 
 *   orders={orders}
 *   onStatusChange={handleStatusChange}
 *   onView={handleView}
 * />
 */

export default function OrderTable({
  orders = [],
  onStatusChange,
  onView,
  onDelete,
  showActions = true,
  selectable = false,
}) {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "date") {
      aVal = new Date(a.date);
      bVal = new Date(b.date);
    }

    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    const statusColors = {
      Processing: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      Pending: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || statusColors.Pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      Processing: "⏳",
      Shipped: "🚚",
      Delivered: "✅",
      Cancelled: "❌",
      Pending: "📦",
    };
    return icons[status] || "📦";
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <p className="text-4xl mb-4">📦</p>
        <p className="text-xl text-gray-500 mb-2">No orders found</p>
        <p className="text-gray-400">Orders will appear here once customers place them</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Selected Actions Bar */}
      {selectable && selectedOrders.length > 0 && (
        <div className="bg-[#4CAF50] text-white rounded-xl p-4 flex items-center justify-between">
          <span className="font-semibold">
            {selectedOrders.length} order{selectedOrders.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white text-[#4CAF50] rounded-lg font-medium hover:bg-gray-100 transition">
              Export
            </button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            
            {/* Table Header */}
            <thead className="bg-[#F9F9F9] border-b">
              <tr>
                {selectable && (
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedOrders.length === orders.length}
                      className="w-5 h-5"
                    />
                  </th>
                )}
                
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-4 text-left text-sm font-semibold text-[#333333] cursor-pointer hover:bg-[#E5E5E5]"
                >
                  Order ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                  Customer
                </th>

                <th
                  onClick={() => handleSort("date")}
                  className="px-6 py-4 text-left text-sm font-semibold text-[#333333] cursor-pointer hover:bg-[#E5E5E5]"
                >
                  Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                  Items
                </th>

                <th
                  onClick={() => handleSort("total")}
                  className="px-6 py-4 text-left text-sm font-semibold text-[#333333] cursor-pointer hover:bg-[#E5E5E5]"
                >
                  Total {sortField === "total" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-[#333333]">
                  Status
                </th>

                {showActions && (
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#333333]">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-[#F9F9F9] transition"
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-5 h-5"
                      />
                    </td>
                  )}

                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#333333]">#{order.id}</span>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-[#333333]">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.email}</p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#333333]">{order.date}</p>
                      {order.time && (
                        <p className="text-sm text-gray-600">{order.time}</p>
                      )}
                    </div>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4 text-[#333333]">
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#4CAF50] text-lg">
                      ${order.total.toFixed(2)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {onStatusChange ? (
                      <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        <span>{getStatusIcon(order.status)}</span>
                        {order.status}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  {showActions && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(order)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition"
                          >
                            View
                          </button>
                        )}
                        
                        <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm font-medium transition">
                          Print
                        </button>

                        {onDelete && (
                          <button
                            onClick={() => onDelete(order.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-[#333333]">{orders.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-[#4CAF50]">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
            <p className="text-2xl font-bold text-[#333333]">
              ${orders.length > 0
                ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2)
                : "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Items Sold</p>
            <p className="text-2xl font-bold text-[#333333]">
              {orders.reduce((sum, order) => sum + order.items, 0)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

// Compact Order Table (for dashboard widgets)
export function CompactOrderTable({ orders = [], limit = 5 }) {
  const limitedOrders = orders.slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333]">Order</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333]">Customer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333]">Total</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#333333]">Status</th>
          </tr>
        </thead>
        <tbody>
          {limitedOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-[#F9F9F9]">
              <td className="px-4 py-3 font-semibold text-[#333333]">#{order.id}</td>
              <td className="px-4 py-3 text-[#333333]">{order.customer}</td>
              <td className="px-4 py-3 font-bold text-[#4CAF50]">${order.total.toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === "Delivered" ? "bg-green-100 text-green-800" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}