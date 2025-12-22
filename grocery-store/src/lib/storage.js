export const saveLocal = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocal = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeLocal = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Simple cookie helpers
export const setCookie = (name, value, days = 7) => {
  if (typeof window !== "undefined") {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
};

export const getCookie = (name) => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export const removeCookie = (name) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
};
