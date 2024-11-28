import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      token: null, // Token user
      user: null, // Data user

      // Fungsi untuk menyimpan token, user, dan first_name
      setAuth: (token, user) => set({ token, user }),

      // Fungsi untuk menghapus data auth (logout)
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-store", // Nama key di localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
