import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react"; // Import button dari Flowbite
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance"; // Pastikan path benar
import useAuthStore from "../../store/authStore";
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
  const [selectedCategory, setSelectedCategory] = useState(null); // State untuk melacak kategori aktif
  const { userId } = useAuthStore(); // Ambil userId dari store

  const postCategoryToBackend = async (categoryName) => {
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/category", {
        UserID: userId, // Gunakan userId dari store
        category: [categoryName],
      });

      console.log("Category posted successfully:", response.data);
      // Setelah berhasil, navigasi ke halaman login
      navigate("/login");
    } catch (error) {
      console.error("Error posting category:", error);
      alert("Failed to save category. Please try again.");
    }
  };

  const handleCategorySelect = (category) => {
    if (selectedCategory === category.name) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.name);
    }
  };

  const handleReadyClick = () => {
    if (!selectedCategory) {
      alert("Please select a category first!");
      return;
    }

    postCategoryToBackend(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-white px-6 sm:px-10 flex flex-col items-center">
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
            className={`relative cursor-pointer group rounded-lg overflow-hidden transition ease-in-out duration-150 ${
              selectedCategory === category.name
                ? "bg-black bg-opacity-50"
                : "hover:shadow-lg"
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 sm:h-96 object-cover object-center"
            />
            <div
              className={`absolute inset-0 bg-black ${
                selectedCategory === category.name
                  ? "bg-opacity-50"
                  : "bg-opacity-25 group-hover:bg-opacity-50"
              } transition-opacity flex items-center justify-center`}
            >
              <h2 className="text-white text-lg sm:text-2xl font-poppins font-semibold">
                {category.name.toUpperCase()}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Ready Button */}
      <Button
        color="customBlue"
        size="lg"
        className="my-10 px-16 sm:px-32 py-1"
        onClick={handleReadyClick}
      >
        <span className="w-40"> I'm Ready to Explore!</span>
      </Button>
    </div>
  );
};

export default CategoryPage;
