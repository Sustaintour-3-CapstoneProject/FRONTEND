import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../common/SearchInput";
import { HiSearch } from "react-icons/hi";
import useAuthStore from "../../../store/authStore";
import axiosInstance from "../../../api/axiosInstance";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuthStore(); // Ambil data autentikasi
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [places, setPlaces] = useState([]); // State untuk menyimpan data destinasi

  // Fungsi untuk mengambil data dari endpoint
  const fetchPlaces = async () => {
    try {
      const response = await axiosInstance.get(
        `/destination/personalized?user_id=84`
      );
      setPlaces(response.data.data || []); // Simpan data dari API ke state
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // Panggil fetchPlaces saat komponen mount
  useEffect(() => {
    fetchPlaces();
  }, []);

  // Update tempat secara otomatis setiap 6 detik
  useEffect(() => {
    if (places.length > 0) {
      const interval = setInterval(() => {
        setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % places.length); // Loop data
      }, 6000);

      return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
    }
  }, [places]);

  const currentPlace = places[currentPlaceIndex]; // Dapatkan destinasi saat ini berdasarkan indeks
  console.log(currentPlace);
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/destinasi?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <div
        className="relative h-[300px] md:h-[500px] w-full bg-cover bg-center rounded-lg shadow-lg"
        style={{
          backgroundImage: currentPlace?.images?.[0]?.url
            ? `url(${currentPlace.images[0].url})`
            : "url('/fallback-image.jpg')", // Ganti dengan gambar fallback jika tidak ada data
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          {/* Judul */}
          <h1 className="text-lg md:text-4xl font-bold mb-4 text-center leading-tight">
            Hi {auth?.username || "User"}
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
            {currentPlace ? (
              <Link to={`/${currentPlace.id || ""}`}>
                <span className="text-xs md:text-sm lg:text-base">
                  {currentPlace?.address || "Address not available"}
                </span>
              </Link>
            ) : (
              <span className="text-xs md:text-sm lg:text-base">
                Loading address...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
