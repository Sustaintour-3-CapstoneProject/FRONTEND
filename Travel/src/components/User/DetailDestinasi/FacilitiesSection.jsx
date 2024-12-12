import React from "react";
import {
  FaRestroom,
  FaParking,
  FaHiking,
  FaSwimmer,
  FaToilet,
} from "react-icons/fa";
import {
  MdRestaurantMenu,
  MdOutlineLocalGroceryStore,
  MdOutlineDirectionsBoat,
} from "react-icons/md";

const facilityIcons = {
  Parking: FaParking,
  Toilets: FaToilet,
  Restroom: FaRestroom,
  "Souvenir Shops": MdOutlineLocalGroceryStore,
  Guides: FaHiking,
  "Swimming Pool": FaSwimmer,
  "Food Stalls": MdRestaurantMenu,
  Bars: MdRestaurantMenu,
  "Hiking Trails": FaHiking,
  Boats: MdOutlineDirectionsBoat,
};

const FacilitiesSection = ({ facilities }) => {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-lg text-gray-700 mb-4">Facilities</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {facilities.map((facility, index) => {
          const IconComponent = facilityIcons[facility];
          return (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-50 py-10 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200 hover:bg-sky-50"
            >
              {IconComponent && <IconComponent size={60} />}
              <p className="text-[13px] font-semibold text-center">
                {facility.toUpperCase()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesSection;