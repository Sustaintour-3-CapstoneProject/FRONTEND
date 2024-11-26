import { TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
const RegisterUser = () => {
  const navigate = useNavigate();

  // Fungsi untuk mengirim data registrasi ke backend
  const handleRegister = async (values) => {
    try {
      const response = await axios.post("/register", values);
      // Jika berhasil, arahkan ke halaman login
      navigate("/loginuser");
    } catch (error) {
      console.error(
        "Terjadi kesalahan:",
        error.response?.data?.message || "Terjadi kesalahan!"
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
  });
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-login.jpg')" }}
      ></div>

      {/* Form Section */}
      <div className="relative z-10 flex min-h-screen justify-end">
        <div className="w-1/2 bg-zinc-100 flex items-center justify-center rounded-s-3xl px-12 dark:bg-gray-800">
          <div className="w-96 flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <div className="pb-4">
              <img src="/logo2.png" alt="logo" />
            </div>

            {/* Judul */}
            <h2 className="text-3xl font-bold mb-4 leading-5 dark:text-white">
              Start Your Adventure!
            </h2>

            {/* Sub Judul */}
            <p className="text-gray-400 mb-6 leading-5">
              Adventure is calling—join us and explore
            </p>

            {/* Form */}
            <form className="w-full" onSubmit={formik.handleSubmit}>
              {/* Nama Depan dan Nama Belakang */}
              <div className="flex gap-2 mb-4">
                <TextInput
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="Nama Depan"
                  className="w-1/2"
                  required
                />
                <TextInput
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  name="lastName"
                  placeholder="Nama Belakang"
                  className="w-1/2"
                  required
                />
              </div>
              {/* Email */}
              <TextInput
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                placeholder="Email"
                className="mb-4"
                required
              />
              {/* Password */}
              <TextInput
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                placeholder="Password"
                className="mb-4"
                required
              />
              <Button color="customBlue" type="submit" className="w-full">
                Register
              </Button>
            </form>

            {/* Link ke Login */}
            <p className="text-sm mt-4">
              Sudah punya akun?{" "}
              <Link
                to="/loginuser"
                className="text-blue-500 hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
