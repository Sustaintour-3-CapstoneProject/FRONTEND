import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full mt-6">
      <button
        className="text-black hover:text-blue-500"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={30} />
      </button>
      <h1 className="text-lg sm:text-2xl font-bold text-center">{title}</h1>
      <div className="w-6" /> {/* Spacer */}
    </div>
  );
};

export default Header;
