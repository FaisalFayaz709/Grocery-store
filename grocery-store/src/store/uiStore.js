import { create } from "zustand";

const useUIStore = create((set) => ({
  sidebarOpen: false,
  modal: null,
  theme: "light",

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  openModal: (modalName) =>
    set({
      modal: modalName,
    }),

  closeModal: () =>
    set({
      modal: null,
    }),

  setTheme: (theme) => set({ theme }),
}));

export default useUIStore;

