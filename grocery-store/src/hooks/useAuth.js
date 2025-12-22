import { useEffect } from "react";
import api from "@/lib/api";
import { saveToken, clearToken, getToken } from "@/lib/auth";
import useUserStore from "@/store/userStore";

export default function useAuth() {
  const { user, setUser, clearUser, isAuthenticated, loading, setLoading } = useUserStore();

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      saveToken(res.data.token);
      setUser(res.data.user);


    // Redirect based on role
    if (res.data.user.role === "Admin") {
      window.location.href = "/Admin";
    } else {
      window.location.href = "/Home";
    }

      return { success: true };
    } catch (err) {
      return { success: false, message: err?.response?.data || "Login failed" };
    }
  };

  const register = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      return { success: true, user: res.data };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data || "Registration failed",
      };
    }
  };

  const logout = () => {
    clearToken();
    clearUser();
    window.location.href = "/auth/login";
  };

  // Auto fetch user from token on mount
  const loadUserFromToken = async () => {
    const token = getToken();
    if (!token){
        setLoading(false);
        return;
     }
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      clearToken();
      clearUser();
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
}
