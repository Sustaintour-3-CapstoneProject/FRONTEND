import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance"; // Pastikan path sesuai
import DestinationCard from "../../common/DestinationCard"; // Pastikan path ini sesuai dengan lokasi file
import useAuthStore from "../../../store/authStore"; // Untuk mendapatkan data user
import SkeletonCard from "../../common/SkeletonCard";

const NearByDestinations = () => {
  const [destinations, setDestinations] = useState([]); // Data dari API
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true); // Untuk menampilkan loader
  const [error, setError] = useState(null); // Untuk menangani error

  const userCityId = useAuthStore((state) => state.auth.city); // Ambil ID city user

  useEffect(() => {
    // Fungsi untuk fetch data nearby destinations dari API berdasarkan city ID
    const fetchDestinations = async () => {
      if (!userCityId) {
        setError("User city ID not available");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/destination?city=${userCityId}`
        );
        setDestinations(response.data.destinations || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching nearby destinations:", err);
        setError("Failed to load destinations.");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [userCityId]);

  useEffect(() => {
    // Fungsi untuk menentukan mode mobile atau desktop
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile jika lebar layar < 640px
    };

    // Panggil saat komponen pertama kali dimuat
    updateScreenSize();

    // Update mode setiap kali ukuran layar berubah
    window.addEventListener("resize", updateScreenSize);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevItem = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length
    );
  };

  const carouselItems = Array.from({ length: 5 }, (_, i) => {
    const index = (startIndex + i) % destinations.length;
    return destinations[index];
  });

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Near By Destinations</h2>
      {loading ? (
        <div className="flex gap-2 md:gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                isMobile
                  ? "min-w-[45%] max-w-[45%]"
                  : "sm:min-w-[260px] sm:max-w-[260px]"
              }`}
            >
              <SkeletonCard /> {/* Komponen skeleton card */}
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div> // Pesan error jika gagal memuat data
      ) : destinations.length === 0 ? (
        <div className="text-center">No destinations found.</div> // Jika data kosong
      ) : (
        <div className="relative flex items-center">
          {/* Tombol Previous */}
          {!isMobile && (
            <button
              onClick={prevItem}
              className="absolute top-1/2 -translate-y-1/2 -left-14 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
              aria-label="Previous"
            >
              <FaChevronLeft size={20} />
            </button>
          )}

          {/* Konten Carousel */}
          <div className="flex overflow-x-auto md:overflow-hidden gap-2 md:gap-4 w-full scrollbar-hide">
            {(isMobile ? destinations : carouselItems).map((destination) => (
              <div
                key={destination.id}
                className={`flex-shrink-0 ${
                  isMobile
                    ? "min-w-[45%] max-w-[45%]"
                    : "sm:min-w-[260px] sm:max-w-[260px]"
                }`}
              >
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>

          {/* Tombol Next */}
          {!isMobile && (
            <button
              onClick={nextItem}
              className="absolute top-1/2 -translate-y-1/2 -right-14 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
              aria-label="Next"
            >
              <FaChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default NearByDestinations;
