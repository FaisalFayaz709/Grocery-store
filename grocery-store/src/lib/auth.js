
// Store token in Cookies (so proxy/middleware can read it)
export const saveToken = (token) => {
  if (typeof document !== "undefined") {
    document.cookie = `token=${token}; path=/; SameSite=Lax;`;
  }
};

export const getToken = () => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
  }
  return null;
};

export const clearToken = () => {
  if (typeof document !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

// Decode JWT (optional)
export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};
