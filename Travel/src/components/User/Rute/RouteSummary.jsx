import React from "react";
import { Button } from "flowbite-react";
import { HiMap, HiClock, HiCurrencyDollar } from "react-icons/hi";

const RouteSummary = ({
  origin = "",
  destination = "",
  distance = 0,
  time = 0,
  totalCost = 0,
  handleSave,
  handleHowToUseClick,
}) => {
  return (
    <div className="flex justify-around items-center space-x-10 ">
      {/* Jarak */}
      <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
        <HiMap size={20} />
        <p className="text-lg font-medium">Jarak:</p>
        {origin && destination && (
          <span className="text-lg font-medium">
            {distance ? `${distance} km` : "Menghitung..."}
          </span>
        )}
      </div>

      {/* Waktu */}
      <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
        <HiClock size={20} />
        <p className="text-lg font-medium">Waktu:</p>
        {origin && destination && (
          <span className="text-lg font-medium">
            {time ? time : "Menghitung..."}
          </span>
        )}
      </div>

      {/* Total Biaya */}
      <span className="flex items-center gap-2 text-lg font-medium border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
        <HiCurrencyDollar size={20} />
        Total Biaya: Rp. {totalCost.toLocaleString()}
      </span>

      {/* Tombol Simpan */}
      <div className="mt-5">
        <Button className="py-1 w-52" color="customBlue" onClick={handleSave}>
          Save Rute
        </Button>
        <div className="flex justify-center items-center mt-1 text-sm">
          <span>Instruction for use?</span>
          <p
            className="text-blue-700 underline cursor-pointer"
            onClick={handleHowToUseClick}
          >
            click here
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;
