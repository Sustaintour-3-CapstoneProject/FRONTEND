import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import useAuthStore from "../store/authStore"; // Import store zustand

const useRegister = () => {
  const [isProcessing, setIsProcessing] = useState(false); // Status proses
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error
  const [successMessage, setSuccessMessage] = useState(""); // Pesan sukses
  const navigate = useNavigate();

  const { setRegisterAuth } = useAuthStore(); // Fungsi untuk menyimpan registerAuth

  const handleRegister = async (values) => {
    console.log("Data yang akan dikirim ke backend:", values);
    setIsProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await registerUser(values);
      console.log(response);

      if (response.success) {
        setSuccessMessage(response.message); // Simpan pesan sukses
        setRegisterAuth(response.data); // Simpan data user dan token ke store

        setTimeout(() => {
          navigate("/category"); // Redirect setelah 3 detik
        }, 3000);
      } else {
        setErrorMessage(response.message); // Simpan pesan error
      }
    } catch (error) {
      setErrorMessage(error.message || "Terjadi kesalahan jaringan!");
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleRegister, isProcessing, errorMessage, successMessage };
};

export default useRegister;
