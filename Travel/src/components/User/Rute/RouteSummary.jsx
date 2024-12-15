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
  isProcessing,
}) => {
  return (
    <div className="flex flex-col items-center w-full px-4 space-y-4 md:space-y-0 md:flex-row md:justify-around md:space-x-10 py-5">
      {/* Jarak */}
      <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300 w-full max-w-xs justify-center">
        <HiMap size={20} />
        {origin && destination && (
          <span className="text-base font-medium">
            {distance ? `${Math.round(Number(distance))} KM` : "Calculate..."}
          </span>
        )}
      </div>

      {/* Waktu */}
      <div className="flex items-center space-x-1 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300 w-full max-w-xs justify-center">
        <HiClock size={20} />

        {origin && destination && (
          <span className="text-base font-medium">
            {time ? time : "Calculate..."}
          </span>
        )}
      </div>

      {/* Total Biaya */}
      <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300 w-full max-w-xs justify-center">
        <HiCurrencyDollar size={20} />
        <span className="text-base font-medium">
          <span className="text-sm"> Rp.</span>

          {totalCost.toLocaleString()}
        </span>
      </div>

      {/* Tombol Simpan */}
      <div className="flex flex-col items-center w-full space-y-3 pt-8 ">
        <Button
          className=" w-full max-w-xs md:w-52"
          color="customBlue"
          onClick={handleSave}
          isProcessing={isProcessing}
          disabled={isProcessing}
        >
          Save Rute
        </Button>

        <div className="flex items-center text-sm">
          <span>Instruction for use?</span>
          <p
            className="text-blue-700 underline cursor-pointer"
            onClick={handleHowToUseClick}
          >
            Click here
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;
