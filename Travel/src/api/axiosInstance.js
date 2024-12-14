import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://www.tripwise.my.id", // URL API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token secara otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.auth?.token || state.registerAuth?.token; // Fallback token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Tidak ada token yang tersedia");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
