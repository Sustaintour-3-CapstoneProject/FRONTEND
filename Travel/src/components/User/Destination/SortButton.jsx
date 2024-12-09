import React from "react";

const SortButton = ({ onSort }) => {
  // Fungsi untuk menangani perubahan opsi
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    onSort(selectedOption); // Panggil onSort yang diberikan sebagai prop
  };

  return (
    <div className="relative">
      {/* Select Option */}
      <select
        onChange={handleSortChange}
        className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      >
        <option value="">Sort By</option>
        <option value="oldest">Oldest</option> {/* Menambahkan opsi Oldest */}
      </select>
    </div>
  );
};

export default SortButton;
