import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import useAuthStore from "../../store/authStore";
import Header from "../../components/User/PersonalKategori/Header";
import CategoryCard from "../../components/User/PersonalKategori/CategoryCard";
import { postCategories } from "../../utils/apiUtils";
// Data kategori
const categories = [
  { name: "Nature", image: "/Category/nature.jpg" },
  { name: "Culture", image: "/Category/culture.jpg" },
  { name: "Ecotourism", image: "/Category/Ecotourism.jpg" },
];

const CategoryPage = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { registerAuth } = useAuthStore();

  // Handle pemilihan kategori
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category.name)) {
        return prev.filter((item) => item !== category.name); // Unselect
      } else if (prev.length < 3) {
        return [...prev, category.name]; // Select max 3
      }
      return prev;
    });
  };

  // Handle klik "I'm Ready"
  const handleReadyClick = async () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category!");
      return;
    }

    if (!registerAuth || !registerAuth.token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    setIsProcessing(true);
    try {
      await postCategories(
        registerAuth.id_user,
        selectedCategories,
        registerAuth.token
      );
      console.log("Categories posted successfully!");
      navigate("/home");
    } catch (error) {
      alert("Failed to save categories. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen my-4 bg-white px-6 sm:px-10 flex flex-col items-center">
      {/* Header */}
      <Header title="Choose Your Style of Adventure!" />

      <p className="text-gray-600 text-center mt-2 max-w-lg">
        Everyone's got their own vibe, and so do you! Select what suits you, and
        we'll offer tailored recommendations.
      </p>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-8 w-full">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            isSelected={selectedCategories.includes(category.name)}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>

      {/* Ready Button */}
      <div className="flex justify-center mt-10">
        <Button
          color="customBlue"
          size="lg"
          className="px-16 sm:px-32 py-1"
          onClick={handleReadyClick}
          disabled={isProcessing}
          isProcessing={isProcessing}
        >
          I'm Ready to Explore
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
