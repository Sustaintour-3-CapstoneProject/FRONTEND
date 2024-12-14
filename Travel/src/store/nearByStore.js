// src/store/nearbyStore.js
import { create } from "zustand";

const useNearbyStore = create((set) => ({
  destinations: [], // Data destinasi
  setDestinations: (data) => set({ destinations: data }), // Fungsi untuk menyimpan data
}));

export default useNearbyStore;
