import { TextInput, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";

const RegisterForm = ({
  handleRegister,
  isProcessing,
  successMessage,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState([]);

  const fetchCity = async () => {
    const response = await axiosInstance.get("/city");
    console.log("City response:", response.data);
    setCity(response.data.cities);
  };
  useEffect(() => {
    fetchCity();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      city: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(4),
      first_name: Yup.string().required().min(3),
      last_name: Yup.string().required().min(5),
      city: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: (values) => {
      handleRegister(values); // Kirim data ke handleRegister
    },
  });
  console.log(formik.values);
  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
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

      <div className="flex flex-col md:flex-row gap-2 mb-2 ">
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
            <p className="font-medium text-sm text-red-500 mt-1">
              {formik.errors.first_name}
            </p>
          )}
        </div>

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
            <p className="font-medium text-sm text-red-500 mt-1">
              {formik.errors.last_name}
            </p>
          )}
        </div>
      </div>

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
        className="mb-2 "
      />
      {formik.touched.username && formik.errors.username && (
        <div className="flex">
          <p className="font-medium text-sm text-red-500 mb-1 ">
            {formik.errors.username}
          </p>
        </div>
      )}

      <select
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full border rounded-lg px-4 py-2 ${
          formik.touched.city && formik.errors.city
            ? "border-red-500"
            : "border-gray-300"
        } mb-2 `}
      >
        <option value="" disabled>
          Pilih Kota
        </option>
        {city.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {formik.touched.city && formik.errors.city && (
        <div className="flex">
          <p className="font-medium text-sm text-red-500 mb-1">
            {formik.errors.city}
          </p>
        </div>
      )}

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
          formik.touched.email && formik.errors.email ? "failure" : undefined
        }
        className="mb-2"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="flex">
          <p className="font-medium text-sm text-red-500 mb-1">
            {formik.errors.email}
          </p>
        </div>
      )}

      <div className="relative mb-4 sm:mb-6">
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
          <div className="flex absolute">
            <p className="font-medium text-sm text-red-500 mb-1">
              {formik.errors.password}
            </p>
          </div>
        )}
      </div>

      <Button
        color="customBlue"
        type="submit"
        className="w-full"
        isProcessing={isProcessing}
        disabled={isProcessing}
      >
        Register
      </Button>

      <p className="text-sm mt-3">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
