import axiosInstance from "../api/axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    const { meta, data } = response.data;

    if (meta.code === 200) {
      return { success: true, message: meta.message, data }; // Sukses
    }

    throw new Error(meta.message || "Login gagal.");
  } catch (error) {
    throw new Error(
      error.response?.data?.meta?.message || "Login gagal. Silakan coba lagi."
    );
  }
};
export const registerUser = async (values) => {
  try {
    const response = await axiosInstance.post("/register", values);
    console.log("Full Response:", response); // Log seluruh response

    // Tangkap data dari objek meta
    const { meta, data } = response.data; // Mengambil meta dan data

    if (meta.code === 200) {
      return {
        success: true,
        message: meta.message || "Registrasi berhasil!",
        data: data, // Mengembalikan data dari response
      };
    }

    return {
      success: false,
      message: meta.message || "Terjadi kesalahan!",
    };
  } catch (error) {
    // Tangkap error dari respons jika status adalah 400 atau lainnya
    if (error.response) {
      const { meta } = error.response.data;

      return {
        success: false,
        status: meta?.code || error.response.status,
        message: meta?.message || "Terjadi kesalahan!",
      };
    }

    // Tangkap error lain jika tidak ada respons dari server
    throw new Error("Terjadi kesalahan jaringan!");
  }
};
