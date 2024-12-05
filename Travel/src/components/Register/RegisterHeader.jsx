import React from "react";

export default function RegisterHeader() {
  return (
    <div>
      <div className="pb-3 sm:pb-4">
        <img src="/logo2.png" alt="logo" className="w-32 mx-auto" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-4 leading-5 dark:text-white">
        Start Your Adventure!
      </h2>
      <p className="text-gray-400 mb-3 sm:mb-6 leading-5">
        Adventure is calling—join us and explore
      </p>
    </div>
  );
}
