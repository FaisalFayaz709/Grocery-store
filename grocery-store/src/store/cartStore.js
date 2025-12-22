import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (product, quantity = 1) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id);

      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === productId ? { ...i, quantity } : i
      ),
    })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
