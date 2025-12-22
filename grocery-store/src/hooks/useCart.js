// import { useEffect } from "react";
// import api from "@/lib/api";
// import useCartStore from "@/store/cartStore";

// export default function useCart() {
//   const {
//     items,
//     addItem,
//     removeItem,
//     updateQuantity,
//     setItems,
//     clearCart,
//   } = useCartStore();

//   // Load cart from backend on login
//   const loadCart = async () => {
//     try {
//       const res = await api.get("/cart");
//       setItems(res.data.items);
//     } catch (err) {
//       console.error("Failed to load cart", err);
//     }
//   };

//   // Sync cart item changes to backend
//   const syncToBackend = async () => {
//     try {
//       await api.post("/cart/sync", { items });
//     } catch (err) {
//       console.error("Cart sync failed", err);
//     }
//   };

//   // Auto-sync when items change
//   useEffect(() => {
//     if (items.length > 0) {
//       syncToBackend();
//     }
//   }, [items]);

//   const addToCart = async (product, quantity = 1) => {
//     addItem(product, quantity);

//     try {
//       await api.post("/cart/add", {
//         productId: product.id,
//         quantity,
//       });
//     } catch (err) {
//       console.error("Failed to add to cart", err);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     removeItem(productId);

//     try {
//       await api.delete(`/cart/remove/${productId}`);
//     } catch (err) {
//       console.error("Failed to remove from cart", err);
//     }
//   };

//   const updateItemQty = async (productId, quantity) => {
//     updateQuantity(productId, quantity);

//     try {
//       await api.put("/cart/update", { productId, quantity });
//     } catch (err) {
//       console.error("Failed to update quantity", err);
//     }
//   };

//   const checkout = async () => {
//     try {
//       const res = await api.post("/orders/checkout");
//       clearCart();
//       return res.data;
//     } catch (err) {
//       console.error("Checkout failed", err);
//       throw err;
//     }
//   };

//   return {
//     items,
//     addToCart,
//     removeFromCart,
//     updateItemQty,
//     checkout,
//     loadCart,
//     total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
//     itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
//   };
// }


// ============================================
// 1. hooks/useCart.js (FIXED VERSION)
// ============================================
// import { useEffect } from "react";
// import api from "@/lib/api";
// import useCartStore from "@/store/cartStore";
// import useUserStore from "@/store/userStore";

// export default function useCart() {
//   const { items, setItems, clearCart: clearStoreCart } = useCartStore();
//   const { isAuthenticated } = useUserStore();

//   // Load cart from backend
//   const loadCart = async () => {
//     if (!isAuthenticated) return;

//     try {
//       const res = await api.get("/cart");
      
//       // Transform backend data to match frontend format
//       const transformedItems = res.data.map((item) => ({
//         id: item.productId,
//         cartItemId: item.id,
//         name: item.productName,
//         price: item.unitPrice,
//         quantity: item.quantity,
//         image: item.productImage || "/placeholder.png",
//       }));

//       setItems(transformedItems);
//     } catch (err) {
//       console.error("Failed to load cart:", err);
//     }
//   };

//   // Add item to cart
//   const addToCart = async (product, quantity = 1) => {
//     try {
//       const res = await api.post("/cart/add", {
//         productId: product.id,
//         quantity: quantity,
//       });

//       // Reload cart after adding
//       await loadCart();

//       return { success: true, message: "Added to cart!" };
//     } catch (err) {
//       console.error("Failed to add to cart:", err);
//       return {
//         success: false,
//         message: err?.response?.data?.message || "Failed to add to cart",
//       };
//     }
//   };

//   // Update quantity
//   const updateItemQty = async (productId, quantity) => {
//     if (quantity < 1) return;

//     try {
//       await api.put(`/cart/update/${productId}`, { quantity });
      
//       // Update local state
//       setItems(
//         items.map((item) =>
//           item.id === productId ? { ...item, quantity } : item
//         )
//       );

//       return { success: true };
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//       return { success: false };
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (productId) => {
//     try {
//       await api.delete(`/cart/remove/${productId}`);

//       // Update local state
//       setItems(items.filter((item) => item.id !== productId));

//       return { success: true, message: "Item removed from cart" };
//     } catch (err) {
//       console.error("Failed to remove from cart:", err);
//       return { success: false };
//     }
//   };

//   // Clear entire cart
//   const clearCart = async () => {
//     try {
//       await api.delete("/cart/clear");
//       clearStoreCart();
//       return { success: true };
//     } catch (err) {
//       console.error("Failed to clear cart:", err);
//       return { success: false };
//     }
//   };

//   // Calculate totals
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   // Auto-load cart when authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadCart();
//     }
//   }, [isAuthenticated]);

//   return {
//     items,
//     addToCart,
//     removeFromCart,
//     updateItemQty,
//     clearCart,
//     loadCart,
//     subtotal,
//     itemCount,
//   };
// }


import { useEffect } from "react";
import api from "@/lib/api";
import useCartStore from "@/store/cartStore";

export default function useCart() {
  const { items, addItem, removeItem, updateQuantity, setItems, clearCart } = useCartStore();

  // Load cart from backend
  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      // Map backend data to frontend format
      const mappedItems = res.data.map(item => ({
        id: item.productId,
        cartItemId: item.id,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
        image: item.productImage,
      }));
      setItems(mappedItems);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      // Add to backend first
      await api.post("/cart/add", {
        productId: product.id,
        quantity: quantity,
      });

      // Then update local state
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      }, quantity);

      // Reload cart to get updated data
      await loadCart();
      
      return { success: true };
    } catch (err) {
      console.error("Failed to add to cart:", err);
      return { success: false, message: err?.response?.data || "Failed to add to cart" };
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      removeItem(productId);
      return { success: true };
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      return { success: false, message: "Failed to remove from cart" };
    }
  };

  // Update quantity
  const updateItemQty = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/update/${productId}`, {
        productId: productId,
        quantity: quantity,
      });
      
      updateQuantity(productId, quantity);
      return { success: true };
    } catch (err) {
      console.error("Failed to update quantity:", err);
      return { success: false, message: "Failed to update quantity" };
    }
  };

  // Clear entire cart
  const clearFullCart = async () => {
    try {
      await api.delete("/cart/clear");
      clearCart();
      return { success: true };
    } catch (err) {
      console.error("Failed to clear cart:", err);
      return { success: false };
    }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateItemQty,
    clearFullCart,
    loadCart,
    subtotal,
    itemCount,
  };
}