import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute() {
  const authToken = useAuthStore((state) => state.auth?.token); // Ambil auth.token
  const registerToken = useAuthStore((state) => state.registerAuth?.token); // Ambil register.token

  // Cek jika salah satu token ada
  return authToken || registerToken ? <Outlet /> : <Navigate to="/login" />;
}
