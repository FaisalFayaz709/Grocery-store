import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function useUserProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err?.response?.data || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Get single product by ID
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/products/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data || "Product not found";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    getProductById,
  };
}