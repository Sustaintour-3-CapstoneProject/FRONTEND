import React from "react";
import { HiLocationMarker, HiClock, HiCurrencyDollar } from "react-icons/hi";

const TitleAndInfoSection = ({ destination }) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold text-sky-800">{destination.name}</h1>
      <div className="flex items-center text-gray-800 mt-2">
        <HiLocationMarker size={24} className="mr-2 " />
        <p>{destination.address}</p>
      </div>
      <div className="flex items-center mt-2 text-gray-800">
        <HiClock size={24} className="mr-2 " />
        <p>{destination.operational_hours}</p>
      </div>
      <div className="flex items-center mt-2 text-gray-800">
        <HiCurrencyDollar size={24} className="mr-2 " />
        <p>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(destination.ticket_price)}
        </p>
      </div>
    </div>
  );
};

export default TitleAndInfoSection;
