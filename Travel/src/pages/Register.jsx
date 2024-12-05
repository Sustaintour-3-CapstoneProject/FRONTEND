import { TextInput, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { useState } from "react";
import { useFormik } from "formik";
import useRegister from "../hooks/useRegister";
import * as Yup from "yup";

const RegisterUser = () => {
  const { handleRegister, isProcessing, errorMessage, successMessage } =
    useRegister();
  // State untuk password visibility
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      city: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required().min(4),
      first_name: Yup.string().required().min(3),
      last_name: Yup.string().required().min(5),
      city: Yup.string().required().min(10),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: handleRegister,
  });
  console.log(formik.errors);
  console.log(formik);
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-bottom sm:bg-center"
        style={{ backgroundImage: "url('/LandingPage/Hero-Section.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-end md:justify-end">
        {/* Register Form Container */}
        <div className="w-full rounded-t-lg md:rounded-tr-none md:w-1/2 bg-zinc-100 flex items-center justify-center px-6 py-8 md:rounded-s-3xl md:px-12 dark:bg-gray-800">
          <div className="w-full h-[650px] sm:h-full max-w-sm flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <div className="pb-3 sm:pb-4">
              <img src="/logo2.png" alt="logo" className="w-32 mx-auto" />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-4 leading-5 dark:text-white">
              Start Your Adventure!
            </h2>

            <p className="text-gray-400 mb-3 sm:mb-6 leading-5">
              Adventure is calling—join us and explore
            </p>

            {/* Success & Error Messages */}
            {successMessage && (
              <Alert color="success" className="mb-4 w-full">
                {successMessage}
              </Alert>
            )}

            {errorMessage && (
              <Alert color="failure" className="mb-4 w-full">
                {errorMessage}
              </Alert>
            )}

            {/* Form */}
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col md:flex-row gap-2 mb-2 sm:mb-4">
                {/* First Name */}
                <div className="w-full md:w-1/2">
                  <TextInput
                    type="text"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={
                      formik.touched.first_name && formik.errors.first_name
                        ? "failure"
                        : undefined
                    }
                    placeholder="Nama Depan"
                    required
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="flex">
                      <p className="font-medium text-sm text-red-500 mt-1">
                        {formik.errors.first_name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="w-full md:w-1/2">
                  <TextInput
                    type="text"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color={
                      formik.touched.last_name && formik.errors.last_name
                        ? "failure"
                        : undefined
                    }
                    placeholder="Nama Belakang"
                    required
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="flex">
                      <p className="font-medium text-sm text-red-500 mt-1">
                        {formik.errors.last_name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="mb-2 sm:mb-4">
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

              {/* city */}
              <div className="mb-2 sm:mb-4">
                <TextInput
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.city && formik.errors.city
                      ? "failure"
                      : undefined
                  }
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="flex">
                    <p className="font-medium text-sm text-red-500 mt-1">
                      {formik.errors.city}
                    </p>
                  </div>
                )}
              </div>

              {/* email*/}
              <div className="mb-2 sm:mb-4">
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color={
                    formik.touched.email && formik.errors.email
                      ? "failure"
                      : undefined
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="flex">
                    <p className="font-medium text-sm text-red-500 mt-1">
                      {formik.errors.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="relative mb-4 sm:mb-8">
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

              {/* Submit Button */}
              <Button
                color="customBlue"
                type="submit"
                className="w-full"
                isProcessing={isProcessing}
                disabled={isProcessing}
              >
                Register
              </Button>
            </form>

            {/* Redirect to Login */}
            <p className="text-sm mt-3 sm:mt-4">
              Sudah punya akun?{" "}
              <Link
                to="/login"
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
