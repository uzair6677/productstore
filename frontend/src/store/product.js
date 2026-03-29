import { create } from "zustand";

export const userProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  // ✅ CREATE
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please provide name, price and image",
      };
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    set((state) => ({
      products: [...state.products, data],
    }));

    return {
      success: true,
      message: "Product created successfully",
    };
  },

  // ✅ FETCH
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();

    set({ products: data.data });
  },

  // ✅ DELETE
  deleteProduct: async (pid) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((p) => p._id !== pid),
    }));

    return { success: true, message: data.message };
  },

  // ✅ UPDATE (FIXED)
  updateProduct: async (pid, updatedData) => {
    const response = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.map((p) =>
        p._id === pid ? { ...p, ...updatedData } : p,
      ),
    }));

    return { success: true, message: data.message }; // ✅ IMPORTANT
  },
}));
