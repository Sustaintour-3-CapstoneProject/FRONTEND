import { TextInput, Checkbox, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { handleLogin, isProcessing, error, successMessage } = useLogin();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username wajib diisi").min(4),
      password: Yup.string().required("Password wajib diisi").min(6),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-login.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-center md:justify-start">
        {/* Login Form Container */}
        <div className="w-full rounded-lg md:w-1/2 bg-zinc-100 flex items-center justify-center px-6 py-8 md:rounded-s-3xl md:px-12 dark:bg-gray-800">
          <div className="w-full max-w-sm flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <div className="pb-4">
              <img src="/logo2.png" alt="logo" className="w-32 mx-auto" />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-5 dark:text-white">
              Welcome Back, Traveler!
            </h2>

            <p className="text-gray-400 mb-6 leading-5">
              Explore your next journey effortlessly.
            </p>

            {/* Success & Error Messages */}
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

            {/* Form */}
            <form className="w-full" onSubmit={formik.handleSubmit}>
              {/* Username */}
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
                  <p className="font-medium text-sm text-red-500 mt-1">
                    {formik.errors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <TextInput
                  id="password"
                  type="password"
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
                {formik.touched.password && formik.errors.password && (
                  <p className="font-medium text-sm text-red-500 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Checkbox
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

              {/* Submit Button */}
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

            {/* Redirect to Register */}
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
