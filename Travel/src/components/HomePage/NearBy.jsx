import React, { useState } from "react";
import { Card } from "flowbite-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const dummyDestinations = [
  {
    id: 1,
    name: "Diamond Beach",
    address: "Nusa Penida, BALI",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Pura Tirta Empul",
    address: "Gianyar, BALI",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Ayana Beach and Resort",
    address: "Gianyar, BALI",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Sekumpul Waterfall",
    address: "Bedugul, BALI",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    name: "Lovina Beach",
    address: "Buleleng, BALI",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    name: "Ulun Danu Temple",
    address: "Bedugul, BALI",
    image: "https://via.placeholder.com/300x200",
  },
];

const NearByDestinations = () => {
  const [startIndex, setStartIndex] = useState(0); // Index awal untuk carousel
  const itemsToShow = 4; // Jumlah item yang ingin ditampilkan

  const nextItem = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + 1) % dummyDestinations.length // Geser 1 item ke depan
    );
  };

  const prevItem = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - 1 + dummyDestinations.length) % dummyDestinations.length // Geser 1 item ke belakang
    );
  };

  // Ambil 4 kartu berdasarkan startIndex
  const carouselItems = Array.from({ length: itemsToShow }, (_, i) => {
    const index = (startIndex + i) % dummyDestinations.length;
    return dummyDestinations[index];
  });

  return (
    <section className="py-8 ">
      <h2 className="text-2xl font-bold mb-6">Near By Destinations</h2>
      <div className="relative flex items-center">
        {/* Tombol Previous */}
        <button
          onClick={prevItem}
          className="mr-2 left-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Konten Carousel */}
        <div className="flex gap-4 overflow-hidden justify-center w-full">
          {carouselItems.map((destination) => (
            <div
              key={destination.id}
            >
              <Card
                imgAlt={destination.name}
                imgSrc={destination.image}
            
              >
                <h5 className="text-md font-bold tracking-tight line-clamp-1 text-gray-900 dark:text-white">
                  {destination.name}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {destination.address}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={nextItem}
          className="ml-2 right-0 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default NearByDestinations;
