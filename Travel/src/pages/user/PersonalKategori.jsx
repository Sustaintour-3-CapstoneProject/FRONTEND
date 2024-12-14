import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react"; // Import button dari Flowbite
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance"; // Pastikan path benar
import useAuthStore from "../../store/authStore";

// Data kategori
const categories = [
  {
    name: "Nature",
    image: "/Category/nature.jpg",
  },
  {
    name: "Culture",
    image: "/Category/culture.jpg",
  },
  {
    name: "Ecotourism",
    image: "/Category/Ecotourism.jpg",
  },
];

const CategoryPage = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]); // State kategori yang dipilih
  const { registerAuth } = useAuthStore(); // Ambil userId dari store

  // Fungsi untuk mengirim data kategori ke backend
  const postCategoryToBackend = async () => {
    if (!registerAuth || !registerAuth.token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/user/category",
        {
          UserID: registerAuth.userId,
          category: selectedCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${registerAuth.token}`,
          },
        }
      );

      console.log("Categories posted successfully:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error posting categories:", error);
      alert("Failed to save categories. Please try again.");
    }
  };

  // Fungsi memilih kategori (maksimal 3)
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category.name)) {
        return prev.filter((item) => item !== category.name);
      } else if (prev.length < 3) {
        return [...prev, category.name];
      }
      return prev;
    });
  };

  // Tombol "I'm Ready"
  const handleReadyClick = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category!");
      return;
    }
    postCategoryToBackend();
  };

  return (
    <div className="min-h-screen my-4 bg-white px-6 sm:px-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-full mt-6">
        <button
          className="text-black hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={30} />
        </button>
        <h1 className="text-lg sm:text-2xl font-bold text-center">
          Choose Your Style of Adventure!
        </h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <p className="text-gray-600 text-center mt-2 max-w-lg">
        Everyone's got their own vibe, and so do you! Select what suits you, and
        we'll offer tailored recommendations.
      </p>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-8 w-full">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategorySelect(category)}
            className={`relative cursor-pointer group rounded-lg overflow-hidden transition ease-in-out duration-150 hover:shadow-lg ${
              selectedCategories.includes(category.name)
                ? "bg-black bg-opacity-50"
                : ""
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 sm:h-96 object-cover object-center"
            />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                selectedCategories.includes(category.name)
                  ? "bg-black bg-opacity-50"
                  : "bg-transparent"
              }`}
            >
              <h2 className="text-white text-lg sm:text-2xl font-poppins font-semibold">
                {category.name.toUpperCase()}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Ready Button */}
      <div className="flex justify-center mt-10">
        <Button
          color="customBlue"
          size="lg"
          className="px-16 sm:px-32 py-1"
          onClick={handleReadyClick}
        >
          <span className="w-44">I'm Ready to Explore!</span>
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
