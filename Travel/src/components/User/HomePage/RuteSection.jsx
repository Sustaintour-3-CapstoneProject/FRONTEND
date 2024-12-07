import React from "react";
import { FaArrowRight } from "react-icons/fa";

const RuteSection = () => {
  return (
    <section className="relative flex flex-col lg:flex-row justify-between items-center bg-blue-50 py-10 md:py-6 px-4 rounded-lg shadow-md mx-auto max-w-6xl my-8 space-y-4 lg:space-y-0">
      {/* Ikon Lokasi Kiri */}
      <img
        src="/homepage/bg-rute.png"
        alt="Rute Kiri"
        className="hidden w-20 h-16 md:block sm:w-32 sm:h-24 lg:w-52 lg:h-48"
      />

      {/* Konten Tengah */}
      <div className="text-center flex flex-col items-center space-y-3 lg:space-y-4">
        <h2 className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-800">
          Find Your Way to Adventure!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Click to explore exciting routes and destinations.
        </p>
        <button className="flex items-center pb-2 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-full shadow transition-all">
          Explore
          <FaArrowRight />
        </button>
      </div>

      {/* Ikon Lokasi Kanan */}
      <img
        src="/homepage/bg-rute.png"
        alt="Rute Kanan"
        className="hidden w-20 h-16 md:block sm:w-32 sm:h-24 lg:w-52 lg:h-48"
      />
    </section>
  );
};

export default RuteSection;
