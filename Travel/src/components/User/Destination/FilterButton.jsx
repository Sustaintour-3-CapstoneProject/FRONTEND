import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterButton = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);
  const closePopup = () => setIsOpen(false);

  const handleFilter = (categoryValue) => {
    onFilter(categoryValue); // Kirim value ke parent
    setIsOpen(false); // Tutup pop-up
  };

  // Array objek dengan label dan value
  const filterCategories = [
    { label: "No Filter", value: "" },
    { label: "Nature", value: "nature" },
    { label: "Culture & Historical", value: "culture" },
    { label: "EcoTourism", value: "ecotourism" },
  ];

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="relative bg-sky-500 py-3 px-3 md:py-3 md:px-3 rounded-md flex items-center justify-center"
      >
        <FaFilter className="text-sm md:text-base text-white" />
      </button>

      {/* Overlay untuk menutup popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closePopup}
        ></div>
      )}

      {/* Pop-up Filter */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="py-2">
            {/* Mapping data filter */}
            {filterCategories.map((category) => (
              <li
                key={category.value}
                className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                onClick={() => handleFilter(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
