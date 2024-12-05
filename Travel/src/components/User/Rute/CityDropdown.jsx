// src/components/CityDropdown.jsx
import React from "react";

const CityDropdown = ({ options, value, onChange }) => {
  return (
    <div className="mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-80 rounded-md bg-sky-500 text-center text-white border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
      >
        <option value="" className="bg-sky-500 text-left text-white">
          Select a city
        </option>
        {options.map((city, idx) => (
          <option
            key={idx}
            value={city.name}
            className="bg-sky-500 text-white text-left"
          >
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
