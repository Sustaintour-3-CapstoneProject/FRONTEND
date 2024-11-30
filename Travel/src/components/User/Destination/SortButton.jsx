import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SortButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk membuka/menutup pop-up
  const togglePopup = () => setIsOpen(!isOpen);

  // Fungsi untuk menutup pop-up jika overlay diklik
  const closePopup = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={togglePopup}
        className="relative bg-sky-500 py-2 px-2 md:py-[10px] md:px-3 rounded-md flex items-center justify-center"
      >
        <div className="flex justify center items-center">
          <span className="text-sm font-semibold md:text-md text-white">
            Sort By
          </span>
          <FaChevronDown className="mt-[3px] ml-2 text-white" />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closePopup}
        ></div>
      )}

      {/* Pop-up Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-sky-100 cursor-pointer">
              Nature
            </li>
            <li className="px-4 py-2 hover:bg-sky-100 cursor-pointer">
              Culture and Historical
            </li>
            <li className="px-4 py-2 hover:bg-sky-100 cursor-pointer">
              Ecotourism
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortButton;
