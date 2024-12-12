import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterButton = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);
  const closePopup = () => setIsOpen(false);

  const handleFilter = (category) => {
    onFilter(category); // Kirim kategori ke parent
    setIsOpen(false); // Tutup pop-up
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="relative bg-sky-500 py-3 px-3 md:py-3 md:px-3 rounded-md flex items-center justify-center"
      >
        <FaFilter className="text-sm md:text-base text-white" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closePopup}
        ></div>
      )}

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="py-2">
            {/* Opsi untuk tidak memfilter */}
            <li
              className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
              onClick={() => handleFilter("")}
            >
              No Filter
            </li>
            {/* Opsi kategori filter */}
            {["nature", "culture", "ecotourism"].map((category) => (
              <li
                key={category}
                className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                onClick={() => handleFilter(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
