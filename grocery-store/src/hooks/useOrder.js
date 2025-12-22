
import { useState } from "react";
import api from "@/lib/api";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err?.response?.data?.error || err?.response?.data || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Get single order
  const getOrderById = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/orders/${orderId}`);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data?.error || err?.response?.data || "Order not found";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Create order (checkout)
  const checkout = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/orders/checkout", orderData);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data?.error || "Failed to create order";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Get all orders (Admin)
  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ FIXED: Changed from "/Admin/orders" to "/orders/admin/all"
      const res = await api.get("/orders/admin/all");
      setOrders(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Failed to fetch all orders:", err);
      const message = err?.response?.data?.error || err?.response?.data || "Failed to fetch orders";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      return { success: true };
    } catch (err) {
      const message = err?.response?.data?.error || err?.response?.data || "Failed to update status";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  // ✅ NEW: Cancel order (User)
  const cancelOrder = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/orders/${orderId}/cancel`);
      return { success: true, message: res.data.message || "Order cancelled successfully" };
    } catch (err) {
      const message = err?.response?.data?.error || err?.response?.data || "Failed to cancel order";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById,
    checkout,
    fetchAllOrders,
    updateOrderStatus,
    cancelOrder,
  };
}