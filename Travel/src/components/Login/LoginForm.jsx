import { TextInput, Checkbox, Button, Alert } from "flowbite-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const LoginForm = ({ handleLogin, isProcessing, error, successMessage }) => {
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
    <form className="w-full" onSubmit={formik.handleSubmit}>
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

      {/* Username Input */}
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

      {/* Password Input */}
      <div className="mb-8 relative">
        <TextInput
          id="password"
          type={showPassword ? "text" : "password"}
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
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEye size={20} className="text-gray-500" />
          ) : (
            <AiOutlineEyeInvisible size={20} className="text-gray-500" />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="absolute font-medium text-sm text-red-500 mt-1">
            {formik.errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Checkbox
            color="sky"
            id="remember"
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
          />
          <label htmlFor="remember" className="text-sm ml-2 cursor-pointer">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
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
  );
};

export default LoginForm;
