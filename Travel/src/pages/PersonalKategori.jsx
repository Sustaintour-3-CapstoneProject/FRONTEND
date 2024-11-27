import React from "react";
import { useNavigate } from "react-router-dom";
// import useRecommendationStore from "../store/recommendationStore";
import { Button } from "flowbite-react"; // Import button dari Flowbite

const categories = [
  {
    name: "Nature",
    image: "https://example.com/images/nature.jpg",
  },
  {
    name: "Culture & Historical",
    image: "https://example.com/images/culture.jpg",
  },
  {
    name: "Ecotourism",
    image: "/Category/Ecotourism.jpg",
  },
];

const CategoryPage = () => {
  const navigate = useNavigate();
  //   const setCategory = useRecommendationStore((state) => state.setCategory);

  //   const handleCategorySelect = (category) => {
  //     setCategory(category.name); // Simpan kategori di Zustand
  //     navigate("/select-city"); // Redirect ke halaman pilih kota
  //   };

  return (
    <div className="min-h-screen bg-white px-6 sm:px-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-full mt-6">
        <button
          className="text-black hover:text-blue-500"
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        >
          &#8592; {/* Icon back */}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Choose Your Style of Adventure!
        </h1>
        <div className="w-6" /> {/* Spacer untuk keseimbangan */}
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
            className="relative cursor-pointer hover:shadow-lg transition rounded-lg overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 sm:h-60 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                {category.name.toUpperCase()}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Ready Button */}
      <Button
        color="blue"
        size="lg"
        className="mt-10"
        onClick={() => navigate("/home")}
      >
        I'm Ready to Explore!
      </Button>
    </div>
  );
};

export default CategoryPage;
