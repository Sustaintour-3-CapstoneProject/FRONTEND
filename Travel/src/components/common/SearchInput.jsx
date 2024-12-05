import React from "react";
import { HiSearch } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { TextInput } from "flowbite-react";
export default function SearchInput() {
  return (
    <div className="flex justify-center">
      {" "}
      {/* Search Bar */}
      <div className="w-full max-w-80 md:max-w-sm flex space-x-2">
        <TextInput
          size={50}
          id="search"
          type="text"
          icon={HiSearch}
          placeholder="Search Your Destination..."
          className="w-full text-sm md:text-base"
        />
      </div>
    </div>
  );
}
