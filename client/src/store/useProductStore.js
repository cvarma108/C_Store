import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASEURL = "http://localhost:3001";

export const useProductsStore = create((set, get) => ({
  products: [],
  error: null,
  loading: false,

  fetchProducts: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${BASEURL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429) {
        set({ error: "Rate limit excedded", products: [] });
      } else {
        set({ error: "Something went wrong", products: [] });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASEURL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => id != product.id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error while deleting product", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
