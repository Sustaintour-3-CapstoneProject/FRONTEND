import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      auth: null, // Menyimpan data autentikasi (token dan user)
      registerAuth: null, // Menyimpan token dan userId setelah registrasi

      // Fungsi untuk menyimpan data autentikasi
      setAuth: (authData) =>
        set((state) => ({
          auth: { ...state.auth, ...authData }, // Gabungkan data lama dengan data baru
        })),

      // Fungsi untuk menyimpan user ID setelah registrasi
      setRegisterAuth: (data) => set({ registerAuth: data }),

      // Fungsi untuk logout
      clearAuth: () => set({ auth: null, registerAuth: null }),
    }),
    {
      name: "auth-store", // Key untuk localStorage
      partialize: (state) => ({
        auth: state.auth, // Hanya menyimpan data autentikasi
        registerAuth: state.registerAuth, // Menyimpan user ID
      }),
    }
  )
);

export default useAuthStore;
