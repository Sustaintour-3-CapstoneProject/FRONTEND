import React from "react";

const FacilitiesSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="w-1/4 h-7 mb-3 bg-gray-300 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-300 py-10 rounded-lg shadow-md animate-pulse"
          >
            {/* Placeholder for Icon */}
            <div className="w-16 h-16 bg-gray-500 rounded-full mb-4"></div>
            {/* Placeholder for Text */}
            <div className="w-24 h-4 bg-gray-500 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSkeleton;
