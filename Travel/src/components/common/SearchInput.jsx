import React from "react";
import { HiSearch } from "react-icons/hi";
import { TextInput } from "flowbite-react";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-80 md:max-w-sm flex space-x-2">
        <TextInput
          size={50}
          id="search"
          type="text"
          icon={HiSearch}
          placeholder="Search Your Destination..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm md:text-base"
        />
      </div>
    </div>
  );
}
