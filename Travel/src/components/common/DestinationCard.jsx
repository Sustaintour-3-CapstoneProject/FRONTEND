import React from "react";
import { Link } from "react-router-dom"; // Untuk navigasi ke detail destinasi

const DestinationCard = ({ destination }) => {
  return (
    <div className="border border-x-gray-100 rounded-lg shadow-lg p-4 bg-white">
      {/* Tautan pada gambar */}
      <Link to={`/home/${destination.id}`}>
        <img
          src={destination.images[0]?.url}
          alt={destination.name}
          className="w-[330px] h-[160px] rounded-md hover:opacity-90 transition object-cover object-center"
        />
      </Link>
      <div className="mt-2">
        {/* Tautan pada nama destinasi */}
        <h5 className="text-md font-bold leading-tight line-clamp-1 text-sky-900 dark:text-white mb-1">
          <Link to={`/home/${destination.id}`}>{destination.name}</Link>
        </h5>
        <p className="text-sm leading-tight text-gray-700 dark:text-gray-400 line-clamp-1">
          {destination.address}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
