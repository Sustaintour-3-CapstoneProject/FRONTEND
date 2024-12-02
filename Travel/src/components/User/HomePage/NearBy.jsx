import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import destinations from "../../../data/destinationData";

const NearByDestinations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // Default: 4 item (desktop)

  useEffect(() => {
    // Fungsi untuk menentukan jumlah item berdasarkan ukuran layar
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1); // Mobile: tampilkan 1 item
      } else {
        setItemsToShow(4); // Desktop: tampilkan 4 item
      }
    };

    // Panggil saat komponen pertama kali dimuat
    updateItemsToShow();

    // Update jumlah item setiap kali ukuran layar berubah
    window.addEventListener("resize", updateItemsToShow);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", updateItemsToShow);
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

  const carouselItems = Array.from({ length: itemsToShow }, (_, i) => {
    const index = (startIndex + i) % destinations.length;
    return destinations[index];
  });

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Near By Destinations</h2>
      <div className="relative flex items-center">
        {/* Tombol Previous */}
        <button
          onClick={prevItem}
          className="mr-2 left-0 bg-gray-800 text-white p-2 rounded-full z-10
            sm:p-2 sm:w-10 sm:h-10
             w-8 h-8"
        >
          <FaChevronLeft size={16} className="sm:size-[24px]" />
        </button>

        {/* Konten Carousel */}
        <div className="flex gap-4 overflow-hidden justify-center w-full">
          {carouselItems.map((destination) => (
            <div
              key={destination.id}
              className="min-w-full sm:min-w-[265px] sm:max-w-[265px]"
            >
              <div className="border border-x-gray-100 rounded-lg shadow-lg p-4 bg-white">
                <Link to={`/home/${destination.id}`}>
                  <img
                    src={destination.images[0]?.url}
                    alt={destination.name}
                    className="w-full h-[180px] sm:w-[265px] sm:h-[180px] rounded-md hover:opacity-90 transition"
                  />
                </Link>
                <div className="mt-2">
                  <h5 className="text-md font-bold leading-tight line-clamp-1 text-sky-900 dark:text-white mb-1">
                    <Link to={`/home/${destination.id}`}>
                      {destination.name}
                    </Link>
                  </h5>
                  <p className="text-sm leading-tight text-gray-700 dark:text-gray-400">
                    {destination.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={nextItem}
          className="ml-2 right-0 bg-gray-800 text-white p-2 rounded-full z-10
            sm:p-2 sm:w-10 sm:h-10
             w-8 h-8"
        >
          <FaChevronRight size={16} className="sm:size-[24px]" />
        </button>
      </div>
    </section>
  );
};

export default NearByDestinations;
