import React from "react";

const CategoryCard = ({ category, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category)}
      className={`relative cursor-pointer group rounded-lg overflow-hidden transition ease-in-out duration-150 hover:shadow-lg ${
        isSelected ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-40 sm:h-96 object-cover object-center"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          isSelected ? "bg-black bg-opacity-50" : "bg-transparent"
        }`}
      >
        <h2 className="text-white text-lg sm:text-2xl font-poppins font-semibold">
          {category.name.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default CategoryCard;
