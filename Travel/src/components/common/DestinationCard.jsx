import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  const placeholderImage = "https://placehold.co/120x80/gray/FefcFFc/png"; // Path ke gambar placeholder online

  return (
    <div className="border border-gray-100 rounded-lg shadow-lg p-4 bg-white transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Tautan pada gambar */}
      <Link to={`/${destination.id}`}>
        <img
          src={destination.images[0]?.url || placeholderImage}
          alt={destination.name || "Placeholder"}
          className="w-[350px] h-[100px] md:h-[140px] rounded-md hover:opacity-90 transition object-cover object-center"
          onError={(e) => {
            e.target.src = placeholderImage; // Gunakan placeholder jika gambar gagal dimuat
          }}
        />

        <div className="mt-2">
          <h5 className="text-md font-bold leading-tight line-clamp-1 text-sky-900 dark:text-white mb-1">
            {destination.name || "Unknown Destination"}
          </h5>
          <p className="text-sm leading-tight text-gray-700 dark:text-gray-400 line-clamp-1">
            {destination.address || "No Address Available"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
