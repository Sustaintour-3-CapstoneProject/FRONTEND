import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://www.tripwise.my.id", // URL API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token secara otomatis jika ada
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore.getState().auth;
    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    } else {
      console.log("Tidak ada token yang tersedia");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
