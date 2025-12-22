import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function useProducts() {
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
      setError(err?.response?.data || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
//   const fetchCategories = async () => {
//     try {
//       const res = await api.get("/categories");
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Failed to fetch categories", err);
//     }
//   };

const fetchCategories = async () => {
  setLoading(true);
  try {
    const res = await api.get("/categories");
    setCategories(res.data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
  setLoading(false);
};


  // Create product
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/products", productData);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data || "Failed to create product";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/products/${id}`, productData);
      return { success: true };
    } catch (err) {
      const message = err?.response?.data || "Failed to update product";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/products/${id}`);
      return { success: true };
    } catch (err) {
      const message = err?.response?.data || "Failed to delete product";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Get single product
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/products/${id}`);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data || "Failed to fetch product";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
}