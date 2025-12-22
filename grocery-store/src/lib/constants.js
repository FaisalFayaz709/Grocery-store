export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5172";

export const COLORS = {
  primary: "#4CAF50",
  secondary: "#FF9800",
  danger: "#E53935",
  gray: "#9E9E9E",
  black: "#212121",
  white: "#FFFFFF",
};

export const ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  CART: "/cart",
  PRODUCTS: "/products",
  ORDERS: "/orders",
};

export const APP_CONFIG = {
  siteName: "Smart Grocery Store",
  paginationSize: 12,
};
