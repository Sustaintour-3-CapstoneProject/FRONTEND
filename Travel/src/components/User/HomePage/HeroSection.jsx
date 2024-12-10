import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../common/SearchInput";
import { HiSearch } from "react-icons/hi";
import useAuthStore from "../../../store/authStore";
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuthStore(); // Ambil data autentikasi dan fungsi logout
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);

  // Update tempat secara otomatis setiap 6 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % dummyData.length); // Loop data
    }, 6000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  const currentPlace = dummyData[currentPlaceIndex]; // Dapatkan destinasi saat ini berdasarkan indeks
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/destinasi?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="">
      <div
        className="relative h-[300px] md:h-[500px] w-full bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${currentPlace.image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          {/* Judul */}
          <h1 className="text-lg md:text-4xl font-bold mb-4 text-center leading-tight">
            Hi {auth.username}
            <br className="block " /> Let's find your next adventure!
          </h1>
          <div className="flex justify-center space-x-2">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <button
              onClick={handleSearch}
              className="bg-sky-500 py-2 px-3 rounded-lg flex items-center justify-center"
            >
              <HiSearch size={20} />
            </button>
          </div>
          <div className="flex items-center mt-3 md:mt-6">
            <FaMapMarkerAlt className="text-white mr-2 text-sm md:text-base" />
            <span className="text-xs md:text-sm lg:text-base">
              Example Address
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
