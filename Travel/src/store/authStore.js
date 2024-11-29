import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: null, // Menyimpan data autentikasi (token dan user)

      // Fungsi untuk menyimpan data autentikasi
      setAuth: (authData) => set({ auth: authData }),

      // Fungsi untuk logout
      clearAuth: () => set({ auth: null }),
    }),
    {
      name: "auth-store", // Key untuk localStorage
      partialize: (state) => ({
        auth: state.auth, // Hanya menyimpan data autentikasi
      }),
    }
  )
);

export default useAuthStore;
