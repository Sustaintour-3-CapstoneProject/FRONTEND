// src/hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginUser } from "../services/authService";

const useLogin = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(""); // State untuk menangani error
  const [successMessage, setSuccessMessage] = useState(""); // State untuk menangani pesan sukses
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (values) => {
    setIsProcessing(true);
    setError(""); // Reset error sebelum login
    setSuccessMessage(""); // Reset pesan sukses sebelum login

    try {
      const response = await loginUser(values);

      if (response.success) {
        setAuth(response.data); // Simpan data user dan token ke store
        setSuccessMessage(response.message); // Simpan pesan sukses

        // Redirect berdasarkan role setelah 3 detik
        const userRole = response.data.role;
        setTimeout(() => {
          if (userRole === "admin") {
            navigate("/dashboard");
          } else if (userRole === "user") {
            navigate("/home");
          } else {
            throw new Error("Role tidak dikenali.");
          }
        }, 3000); // 3 detik delay
      } else {
        setError(response.message || "Login gagal.");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login."); // Tangkap pesan error
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleLogin, isProcessing, error, successMessage };
};

export default useLogin;
