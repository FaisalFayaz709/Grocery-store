import { useState } from "react";
import api from "@/lib/api";

export default function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user-specific recommendations
  const fetchUserRecommendations = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/recommendations/user/${userId}`);
      setRecommendations(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError(err?.response?.data || "Failed to fetch recommendations");
      return { success: false, message: err?.response?.data || "Failed to fetch recommendations" };
    } finally {
      setLoading(false);
    }
  };

  // Fetch popular products (fallback when user has no history)
  const fetchPopularProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/recommendations/popular");
      setRecommendations(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Failed to fetch popular products:", err);
      setError(err?.response?.data || "Failed to fetch popular products");
      return { success: false, message: err?.response?.data || "Failed to fetch popular products" };
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendations,
    loading,
    error,
    fetchUserRecommendations,
    fetchPopularProducts,
  };
}