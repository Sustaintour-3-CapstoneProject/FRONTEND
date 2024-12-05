import { TextInput, Checkbox, Button, Alert } from "flowbite-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { handleLogin, isProcessing, error, successMessage } = useLogin();

  // State untuk password visibility
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username wajib diisi").min(4),
      password: Yup.string().required("Password wajib diisi").min(6),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-top sm:bg-center bg-[url('/LandingPage/Hero-Section.jpg')]"></div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-end md:justify-start">
        <div className="w-full md:min-h-full rounded-t-lg md:rounded-tl-none md:w-1/2 bg-zinc-100 flex items-center justify-center px-6 py-8 md:rounded-e-3xl md:px-12 dark:bg-gray-800">
          <div className="w-full max-w-sm h-[650px] sm:h-full flex flex-col items-center justify-center text-center">
            <div className="pb-4">
              <img src="/logo2.png" alt="logo" className="w-32 mx-auto" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-5 dark:text-white">
              Welcome Back, Traveler!
            </h2>

            <p className="text-gray-400 mb-6 leading-5">
              Explore your next journey effortlessly.
            </p>

            {successMessage && (
              <Alert color="success" className="mb-4 w-full">
                {successMessage} Redirecting in 3 seconds...
              </Alert>
            )}

            {error && (
              <Alert color="failure" className="mb-4 w-full">
                {error}
              </Alert>
            )}

            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <TextInput
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.username && formik.errors.username
                      ? "failure"
                      : undefined
                  }
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="flex">
                    <p className="font-medium text-sm text-red-500 mt-1">
                      {formik.errors.username}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-8 relative">
                <TextInput
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  placeholder="Password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.password && formik.errors.password
                      ? "failure"
                      : undefined
                  }
                />
                <div
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} className="text-gray-500" />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-gray-500"
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="flex absolute">
                    <p className="font-medium text-sm text-red-500 mt-1">
                      {formik.errors.password}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Checkbox
                    color="sky"
                    id="remember"
                    name="remember"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm ml-2 cursor-pointer"
                  >
                    Ingat Saya
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Lupa Password?
                </a>
              </div>

              <Button
                color="customBlue"
                type="submit"
                className="w-full"
                isProcessing={isProcessing}
                disabled={isProcessing}
              >
                Login
              </Button>
            </form>

            <p className="text-sm mt-4">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:underline font-semibold"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
