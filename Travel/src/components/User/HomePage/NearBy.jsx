import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import destinations from "../../../data/destinationData";
import DestinationCard from "../../common/DestinationCard"; // Pastikan path ini sesuai dengan lokasi file

const NearByDestinations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
              <DestinationCard destination={destination} />{" "}
              {/* Menggunakan komponen DestinationCard */}
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
    </section>
  );
};

export default NearByDestinations;
