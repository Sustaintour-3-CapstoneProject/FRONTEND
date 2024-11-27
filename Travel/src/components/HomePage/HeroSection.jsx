import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

// Data Dummy
const dummyData = [
  {
    id: 1,
    name: "Raja Ampat, West Papua",
    image: "/homepage/rajaampat.jpg", // Ganti dengan URL gambar Anda
    address: "Raja Ampat, Indonesia",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "https://via.placeholder.com/1920x1080", // Ganti dengan URL gambar Anda
    address: "Bali, Indonesia",
  },
  {
    id: 3,
    name: "Komodo Island, Indonesia",
    image: "/homepage/Ecotourism.jpg", // Ganti dengan URL gambar Anda
    address: "Komodo, Indonesia",
  },
];

const HeroSection = () => {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);

  // Update tempat secara otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % dummyData.length); // Loop data
    }, 5000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  const currentPlace = dummyData[currentPlaceIndex]; // Dapatkan destinasi saat ini berdasarkan indeks

  return (
    <div
      className="relative h-[400px] md:h-[500px] w-full bg-cover bg-center rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${currentPlace.image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Hi Alaia! Let's find your next adventure!
        </h1>
        {/* Search Bar */}
        <div className="max-w-lg flex space-x-3">
          <TextInput
            size={50}
            id="search"
            type="text"
            icon={HiSearch}
            placeholder="Search Your Destination..."
          />
          <button className="bg-sky-500 py-3 px-3 rounded-md">
            <FaSearch />
          </button>
        </div>
        {/* Location */}
        <div className="flex items-center mt-6">
          <FaMapMarkerAlt className="text-white mr-2" />
          <span className="text-sm md:text-base">{currentPlace.address}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
