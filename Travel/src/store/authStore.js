import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: null, // Menyimpan data autentikasi (token dan user)
      userId: null, // Menyimpan user ID terpisah

      // Fungsi untuk menyimpan data autentikasi
      setAuth: (authData) => set({ auth: authData }),

      // Fungsi untuk menyimpan user ID
      setUserId: (id) => set({ userId: id }),

      // Fungsi untuk logout
      clearAuth: () => set({ auth: null, userId: null }),
    }),
    {
      name: "auth-store", // Key untuk localStorage
      partialize: (state) => ({
        auth: state.auth, // Hanya menyimpan data autentikasi
        userId: state.userId, // Menyimpan user ID
      }),
    }
  )
);

export default useAuthStore;
